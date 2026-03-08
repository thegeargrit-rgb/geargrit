import type { AffiliateLink } from "@/lib/affiliate/types";

const SANITY_API_VERSION = "2024-01-01";
const sanityProjectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ??
  process.env.SANITY_PROJECT_ID ??
  "javjsy18";
const sanityDataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ??
  process.env.SANITY_DATASET ??
  "production";

type SanityAffiliateLinkRow = {
  slug: string;
  destinationUrl: string;
  merchant?: string | null;
};

type SanityQueryResponse<T> = {
  result: T;
};

const AFFILIATE_LINK_BY_SLUG_QUERY = `
*[_type == "affiliateLink" && slug == $slug && isActive == true][0]{
  slug,
  destinationUrl,
  merchant
}
`;

export async function findAffiliateLinkInSanity(
  slug: string,
): Promise<AffiliateLink | null> {
  const queryParams = new URLSearchParams({
    query: AFFILIATE_LINK_BY_SLUG_QUERY,
    $slug: JSON.stringify(slug),
  });

  const url = `https://${sanityProjectId}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${sanityDataset}?${queryParams.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Sanity affiliate lookup failed (${response.status}): ${body}`,
    );
  }

  const payload =
    (await response.json()) as SanityQueryResponse<SanityAffiliateLinkRow | null>;
  const row = payload.result;

  if (!row?.destinationUrl) {
    return null;
  }

  return {
    slug: row.slug,
    destinationUrl: row.destinationUrl,
    merchant: row.merchant,
  };
}
