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
  recordRedirectOutcome,
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
  const referrer = request.headers.get("referer");

  if (isLikelyBotUserAgent(userAgent)) {
    await recordRedirectOutcome({
      slug,
      statusCode: 403,
      reason: "blocked-bot",
      resolver: "none",
      referrer,
      userAgent,
      ipAddress,
    });

    return NextResponse.json({ error: "Blocked" }, { status: 403 });
  }

  const rateLimit = checkRateLimit(ipAddress);
  if (!rateLimit.allowed) {
    await recordRedirectOutcome({
      slug,
      statusCode: 429,
      reason: "rate-limited",
      resolver: "none",
      referrer,
      userAgent,
      ipAddress,
    });

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
    await recordRedirectOutcome({
      slug,
      statusCode: 307,
      reason: "invalid-slug",
      resolver: "none",
      referrer,
      userAgent,
      ipAddress,
    });

    return NextResponse.redirect(
      getFallbackUrl(request, "invalid-slug", slug),
      307,
    );
  }

  const { link, resolver } = await resolveAffiliateLink(slug);

  if (!link) {
    await recordRedirectOutcome({
      slug,
      statusCode: 307,
      reason: "missing-link",
      resolver,
      referrer,
      userAgent,
      ipAddress,
    });

    return NextResponse.redirect(
      getFallbackUrl(request, "missing-link", slug),
      307,
    );
  }

  const destinationUrl = getSafeDestination(link);

  if (!destinationUrl) {
    await recordRedirectOutcome({
      slug,
      destinationUrl: link.destinationUrl,
      merchant: link.merchant,
      statusCode: 307,
      reason: "unsafe-destination",
      resolver,
      referrer,
      userAgent,
      ipAddress,
    });

    return NextResponse.redirect(
      getFallbackUrl(request, "unsafe-destination", slug),
      307,
    );
  }

  await recordAffiliateClick({
    slug,
    destinationUrl,
    merchant: link.merchant,
    referrer,
    userAgent,
    ipAddress,
  });

  await recordRedirectOutcome({
    slug,
    destinationUrl,
    merchant: link.merchant,
    statusCode: 307,
    reason: "redirect-success",
    resolver,
    referrer,
    userAgent,
    ipAddress,
  });

  const response = NextResponse.redirect(destinationUrl, 307);
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");

  return response;
}
