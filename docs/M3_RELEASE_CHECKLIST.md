# M3 Release Checklist (Technical)

Date: 2026-03-08

## Scope

This checklist tracks technical readiness for M3 MVP launch in `apps/web`.

## Core Routing and Templates

- [x] Homepage route (`/`)
- [x] Niche hub pages (`/badminton`, `/trekking`)
- [x] Category listing and detail routes (`/categories`, `/categories/[slug]`)
- [x] Review listing and detail routes (`/reviews`, `/reviews/[slug]`)
- [x] Guide listing and detail routes (`/guides`, `/guides/[slug]`)
- [x] Blog index and article placeholder routes (`/blog`, `/blog/[slug]`)
- [x] Brand and subcategory placeholder templates (`/brands/[slug]`, `/subcategories/[slug]`)
- [x] Search placeholder route (`/search`)

## Trust, Legal, and UX Safety

- [x] About page (`/about`)
- [x] Contact page (`/contact`)
- [x] Affiliate disclosure page (`/affiliate-disclosure`)
- [x] Privacy and terms placeholders (`/privacy`, `/terms`)
- [x] Custom 404 page (`/not-found` route handler)
- [x] Breadcrumb component integrated into slug detail pages

## Affiliate and Monetization Baseline

- [x] `/go/[slug]` redirect pipeline with logging and fallback
- [x] Affiliate CTA component on review detail pages
- [x] Affiliate disclosure block on monetized template
- [x] Admin affiliate health dashboard and protection

## SEO and Discoverability

- [x] Canonical metadata helper (`buildPageMetadata`) used broadly
- [x] Canonical `alternates` on dynamic slug routes
- [x] `robots.ts` present
- [x] `sitemap.ts` present and includes primary route groups
- [x] Search placeholder marked `noindex`
- [x] Placeholder dynamic templates constrained with `dynamicParams = false`

## Deployment and Platform Readiness

- [x] Vercel deployment checklist document
- [x] Health endpoint (`/api/health`)
- [x] Cloudinary delivery helper + next/image host config
- [x] `.env.example` template

## Contact and Communication

- [x] `/api/contact` route with server validation
- [x] Honeypot anti-spam field
- [x] Resend-ready mode with safe fallback when key not configured
- [x] Contact page wired to client form submit flow

## Validation Snapshot

- [x] `npm run lint` passes in `apps/web`
- [ ] `npm run build` passes in current environment
  - Blocker: font fetch from Google (`Inter`, `Sora`) fails in restricted network runtime.

## Remaining for Final M3 Exit

- [ ] Populate real launch content set in Sanity (non-placeholder pages).
- [ ] Replace placeholder template routes with CMS-backed data and publish gates.
- [ ] Configure production env values in Vercel and run deployed smoke test.
- [ ] Final manual UX QA across desktop/mobile on key routes.
- [ ] Create final M3 release tag after full content and deployment verification.