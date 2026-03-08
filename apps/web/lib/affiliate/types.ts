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
