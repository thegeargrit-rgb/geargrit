import { NextRequest, NextResponse } from "next/server";
import {
  checkRateLimit,
  isLikelyBotUserAgent,
} from "@/lib/affiliate/abuse-guard";
import {
  getClientIp,
  getSafeDestination,
  isValidSlug,
  normalizeSlug,
  recordAffiliateClick,
  resolveAffiliateLink,
} from "@/lib/affiliate/service";

function getFallbackUrl(
  request: NextRequest,
  reason: string,
  slug: string,
): URL {
  const url = new URL("/", request.url);
  url.searchParams.set("go", reason);
  url.searchParams.set("slug", slug);
  return url;
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug: rawSlug } = await context.params;
  const slug = normalizeSlug(rawSlug);
  const userAgent = request.headers.get("user-agent");
  const ipAddress = getClientIp(request.headers);

  if (isLikelyBotUserAgent(userAgent)) {
    return NextResponse.json({ error: "Blocked" }, { status: 403 });
  }

  const rateLimit = checkRateLimit(ipAddress);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Rate limit exceeded" },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
          "Cache-Control": "no-store",
        },
      },
    );
  }

  if (!slug || !isValidSlug(slug)) {
    return NextResponse.redirect(
      getFallbackUrl(request, "invalid-slug", slug),
      307,
    );
  }

  const link = await resolveAffiliateLink(slug);

  if (!link) {
    return NextResponse.redirect(
      getFallbackUrl(request, "missing-link", slug),
      307,
    );
  }

  const destinationUrl = getSafeDestination(link);

  if (!destinationUrl) {
    return NextResponse.redirect(
      getFallbackUrl(request, "unsafe-destination", slug),
      307,
    );
  }

  await recordAffiliateClick({
    slug,
    destinationUrl,
    merchant: link.merchant,
    referrer: request.headers.get("referer"),
    userAgent,
    ipAddress,
  });

  const response = NextResponse.redirect(destinationUrl, 307);
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");

  return response;
}
