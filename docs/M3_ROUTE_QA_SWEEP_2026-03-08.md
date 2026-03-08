# M3 Route QA Sweep

Date: 2026-03-08
Workspace: `apps/web`

## Automated Checks

1. `npm run lint`
- Result: PASS

2. `npm run build`
- Result: FAIL (environmental)
- Cause: `next/font` could not fetch Google Fonts (`Inter`, `Sora`) due to network restriction in current runtime.
- Code impact: No local type/lint errors detected from this failure mode.

## Route Inventory Check

Detected routes from `apps/web/app`:
- `/`
- `/about`
- `/admin/affiliate-health`
- `/affiliate-disclosure`
- `/badminton`
- `/blog`
- `/blog/[slug]`
- `/brands/[slug]`
- `/categories`
- `/categories/[slug]`
- `/contact`
- `/go/[slug]`
- `/guides`
- `/guides/[slug]`
- `/privacy`
- `/reviews`
- `/reviews/[slug]`
- `/search`
- `/subcategories/[slug]`
- `/terms`
- `/trekking`
- Utility: `/robots.txt`, `/sitemap.xml`, `/api/health`, `/api/contact`

## Metadata Coverage

- Static pages: using `buildPageMetadata` for canonical + OG consistency.
- Dynamic pages: `generateMetadata` with canonical `alternates` and OG data.
- Placeholder dynamic templates (`blog/[slug]`, `brands/[slug]`, `subcategories/[slug]`):
  - `dynamicParams = false`
  - sample static params only
  - `noindex` robots policy

## QA Notes

- Contact flow is wired end-to-end and functions in mock mode when `RESEND_API_KEY` is absent.
- Review detail pages show affiliate CTA + disclosure when `affiliateSlug` is present.
- Breadcrumbs are present on primary detail templates.

## Recommended Next QA Step

Run full deployed smoke test on Vercel preview after env setup:
- Home, hubs, list/detail routes
- contact form submission
- `/go/[slug]` redirect behavior
- `/robots.txt` and `/sitemap.xml`
- admin auth flow on `/admin/affiliate-health`