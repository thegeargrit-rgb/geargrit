const SANITY_API_VERSION = "2024-01-01";

const sanityProjectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ??
  process.env.SANITY_PROJECT_ID ??
  "javjsy18";
const sanityDataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ??
  process.env.SANITY_DATASET ??
  "production";

type QueryParams = Record<string, string | number | boolean>;

type SanityQueryResponse<T> = {
  result: T;
};

function buildSanityQueryUrl(query: string, params?: QueryParams): string {
  const queryParams = new URLSearchParams({ query });

  if (params && Object.keys(params).length > 0) {
    for (const [key, value] of Object.entries(params)) {
      queryParams.set(`$${key}`, JSON.stringify(value));
    }
  }

  return `https://${sanityProjectId}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${sanityDataset}?${queryParams.toString()}`;
}

export async function runSanityQuery<T>(
  query: string,
  params?: QueryParams,
  revalidateSeconds = 60,
): Promise<T> {
  const url = buildSanityQueryUrl(query, params);

  const response = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
    next: { revalidate: revalidateSeconds },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Sanity query failed (${response.status}): ${response.statusText}. ${errorBody}`,
    );
  }

  const payload = (await response.json()) as SanityQueryResponse<T>;
  return payload.result;
}
