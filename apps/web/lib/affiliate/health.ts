type SupabaseConfig = {
  url: string;
  key: string;
};

type ClickEventRow = {
  slug: string;
  clicked_at: string;
};

type ActiveAffiliateLinkRow = {
  slug: string;
};

export type TopClickedSlug = {
  slug: string;
  clicks: number;
};

export type AffiliateHealthReport = {
  rangeStartIso: string;
  totalClicks: number;
  topClickedSlugs: TopClickedSlug[];
  unmappedClickedSlugs: TopClickedSlug[];
  sqlFixSnippets: string[];
  available: boolean;
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

function buildRangeStartIso(days: number): string {
  const now = new Date();
  const start = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  return start.toISOString();
}

function aggregateClicks(rows: ClickEventRow[]): TopClickedSlug[] {
  const counts = new Map<string, number>();

  for (const row of rows) {
    const slug = row.slug?.trim().toLowerCase();
    if (!slug) {
      continue;
    }

    counts.set(slug, (counts.get(slug) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([slug, clicks]) => ({ slug, clicks }))
    .sort((a, b) => b.clicks - a.clicks);
}

function buildSqlFixSnippet(slug: string): string {
  return `insert into public.affiliate_links (slug, destination_url, merchant, is_active) values ('${slug}', 'https://example.com/', 'amazon', true) on conflict (slug) do update set destination_url = excluded.destination_url, merchant = excluded.merchant, is_active = excluded.is_active;`;
}

export async function getAffiliateHealthReport(): Promise<AffiliateHealthReport> {
  const config = getSupabaseConfig();
  const rangeStartIso = buildRangeStartIso(7);

  if (!config) {
    return {
      rangeStartIso,
      totalClicks: 0,
      topClickedSlugs: [],
      unmappedClickedSlugs: [],
      sqlFixSnippets: [],
      available: false,
    };
  }

  const clicksQuery = new URLSearchParams({
    select: "slug,clicked_at",
    clicked_at: `gte.${rangeStartIso}`,
    order: "clicked_at.desc",
    limit: "2000",
  });

  const linksQuery = new URLSearchParams({
    select: "slug",
    is_active: "eq.true",
    limit: "2000",
  });

  const [clicksResponse, linksResponse] = await Promise.all([
    supabaseFetch(config, `click_events?${clicksQuery.toString()}`, {
      method: "GET",
    }),
    supabaseFetch(config, `affiliate_links?${linksQuery.toString()}`, {
      method: "GET",
    }),
  ]);

  if (!clicksResponse.ok) {
    const body = await clicksResponse.text();
    throw new Error(
      `Failed click_events fetch (${clicksResponse.status}): ${body}`,
    );
  }

  if (!linksResponse.ok) {
    const body = await linksResponse.text();
    throw new Error(
      `Failed affiliate_links fetch (${linksResponse.status}): ${body}`,
    );
  }

  const clickRows = (await clicksResponse.json()) as ClickEventRow[];
  const activeLinkRows =
    (await linksResponse.json()) as ActiveAffiliateLinkRow[];

  const topClicked = aggregateClicks(clickRows);
  const activeSlugs = new Set(
    activeLinkRows.map((row) => row.slug?.trim().toLowerCase()).filter(Boolean),
  );

  const unmapped = topClicked.filter((row) => !activeSlugs.has(row.slug));

  return {
    rangeStartIso,
    totalClicks: clickRows.length,
    topClickedSlugs: topClicked.slice(0, 20),
    unmappedClickedSlugs: unmapped.slice(0, 20),
    sqlFixSnippets: unmapped
      .slice(0, 5)
      .map((row) => buildSqlFixSnippet(row.slug)),
    available: true,
  };
}
