import { findAffiliateLinkInSanity } from "@/lib/affiliate/sanity-rest";
import {
  findAffiliateLinkBySlug,
  logAffiliateClick,
} from "@/lib/affiliate/supabase-rest";
import type { AffiliateLink } from "@/lib/affiliate/types";

const SAFE_PROTOCOLS = new Set(["http:", "https:"]);

export function normalizeSlug(rawSlug: string): string {
  return rawSlug.trim().toLowerCase();
}

export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9-]+$/.test(slug);
}

export function getClientIp(headers: Headers): string | null {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? null;
  }

  return headers.get("x-real-ip") ?? null;
}

export function getSafeDestination(link: AffiliateLink): string | null {
  try {
    const url = new URL(link.destinationUrl);
    return SAFE_PROTOCOLS.has(url.protocol) ? url.toString() : null;
  } catch {
    return null;
  }
}

export async function resolveAffiliateLink(
  slug: string,
): Promise<AffiliateLink | null> {
  try {
    const supabaseLink = await findAffiliateLinkBySlug(slug);
    if (supabaseLink) {
      return supabaseLink;
    }
  } catch (error) {
    console.error(`Supabase affiliate lookup failed for slug: ${slug}`, error);
  }

  try {
    return await findAffiliateLinkInSanity(slug);
  } catch (error) {
    console.error(`Sanity affiliate lookup failed for slug: ${slug}`, error);
    return null;
  }
}

export async function recordAffiliateClick(input: {
  slug: string;
  destinationUrl: string;
  merchant?: string | null;
  referrer?: string | null;
  userAgent?: string | null;
  ipAddress?: string | null;
}): Promise<void> {
  try {
    await logAffiliateClick({
      ...input,
      clickedAt: new Date().toISOString(),
    });
  } catch (error) {
    // Logging must never block redirect flow.
    console.error(`Failed affiliate click log for slug: ${input.slug}`, error);
  }
}
