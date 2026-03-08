import type {
  AffiliateLink,
  ClickEvent,
  RedirectLogEvent,
} from "@/lib/affiliate/types";

type SupabaseConfig = {
  url: string;
  key: string;
};

type AffiliateLinkRow = {
  slug: string;
  destination_url: string;
  merchant?: string | null;
};

function getSupabaseConfig(): SupabaseConfig | null {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  return { url, key };
}

async function supabaseFetch(
  config: SupabaseConfig,
  path: string,
  init: RequestInit,
): Promise<Response> {
  return fetch(`${config.url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });
}

export async function findAffiliateLinkBySlug(
  slug: string,
): Promise<AffiliateLink | null> {
  const config = getSupabaseConfig();
  if (!config) {
    return null;
  }

  const query = new URLSearchParams({
    select: "slug,destination_url,merchant",
    slug: `eq.${slug}`,
    is_active: "eq.true",
    limit: "1",
  });

  const response = await supabaseFetch(
    config,
    `affiliate_links?${query.toString()}`,
    { method: "GET" },
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Affiliate link lookup failed (${response.status}): ${body}`,
    );
  }

  const rows = (await response.json()) as AffiliateLinkRow[];
  const row = rows[0];

  if (!row?.destination_url) {
    return null;
  }

  return {
    slug: row.slug,
    destinationUrl: row.destination_url,
    merchant: row.merchant,
  };
}

export async function logAffiliateClick(event: ClickEvent): Promise<void> {
  const config = getSupabaseConfig();
  if (!config) {
    return;
  }

  const payload = {
    slug: event.slug,
    destination_url: event.destinationUrl,
    merchant: event.merchant ?? null,
    referrer: event.referrer ?? null,
    user_agent: event.userAgent ?? null,
    ip_address: event.ipAddress ?? null,
    clicked_at: event.clickedAt,
  };

  const response = await supabaseFetch(config, "click_events", {
    method: "POST",
    headers: {
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Click event insert failed (${response.status}): ${body}`);
  }
}

export async function logRedirectOutcome(
  event: RedirectLogEvent,
): Promise<void> {
  const config = getSupabaseConfig();
  if (!config) {
    return;
  }

  const payload = {
    slug: event.slug ?? null,
    destination_url: event.destinationUrl ?? null,
    merchant: event.merchant ?? null,
    status_code: event.statusCode,
    reason: event.reason,
    resolver: event.resolver ?? "none",
    referrer: event.referrer ?? null,
    user_agent: event.userAgent ?? null,
    ip_address: event.ipAddress ?? null,
    created_at: event.createdAt,
  };

  const response = await supabaseFetch(config, "redirect_logs", {
    method: "POST",
    headers: {
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Redirect log insert failed (${response.status}): ${body}`);
  }
}
