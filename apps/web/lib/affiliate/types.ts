export type AffiliateLink = {
  slug: string;
  destinationUrl: string;
  merchant?: string | null;
};

export type ClickEvent = {
  slug: string;
  destinationUrl: string;
  merchant?: string | null;
  referrer?: string | null;
  userAgent?: string | null;
  ipAddress?: string | null;
  clickedAt: string;
};

export type RedirectLogEvent = {
  slug?: string | null;
  destinationUrl?: string | null;
  merchant?: string | null;
  statusCode: number;
  reason: string;
  resolver?: "supabase" | "sanity" | "none";
  referrer?: string | null;
  userAgent?: string | null;
  ipAddress?: string | null;
  createdAt: string;
};
