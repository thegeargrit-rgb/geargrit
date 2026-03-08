# M3 Release Checklist (Technical)

Date: 2026-03-09

## Scope

This checklist tracks technical readiness for M3 MVP launch in `apps/web`.

## Core Routing and Templates

- [x] Homepage route (`/`)
- [x] Niche hub pages (`/badminton`, `/trekking`)
- [x] Category listing and detail routes (`/categories`, `/categories/[slug]`)
- [x] Review listing and detail routes (`/reviews`, `/reviews/[slug]`)
- [x] Guide listing and detail routes (`/guides`, `/guides/[slug]`)
- [x] Blog index and article routes (`/blog`, `/blog/[slug]`) CMS-backed
- [x] Brand route (`/brands/[slug]`) CMS-backed
- [x] Subcategory route (`/subcategories/[slug]`) CMS-backed
- [x] Search placeholder route (`/search`) with `noindex`

## Trust, Legal, and UX Safety

- [x] About page (`/about`)
- [x] Contact page (`/contact`)
- [x] Affiliate disclosure page (`/affiliate-disclosure`)
- [x] Privacy and terms pages (`/privacy`, `/terms`)
- [x] Custom 404 page (`/not-found` route handler)
- [x] Breadcrumb component integrated into slug detail pages

## Affiliate and Monetization Baseline

- [x] `/go/[slug]` redirect pipeline with logging and fallback
- [x] Affiliate CTA component on review detail pages
- [x] Affiliate disclosure block on monetized templates
- [x] Admin affiliate health dashboard and route protection

## SEO and Discoverability

- [x] Canonical metadata helper (`buildPageMetadata`) used broadly
- [x] Canonical `alternates` on dynamic slug routes
- [x] `robots.ts` present
- [x] `sitemap.ts` present and includes primary dynamic route groups

## Deployment and Platform Readiness

- [x] Vercel deployment checklist document
- [x] Health endpoint (`/api/health`)
- [x] Cloudinary delivery helper + next/image host config
- [x] `.env.example` template
- [x] `.vercelignore` added to prevent oversize deploy uploads
- [x] Production smoke script (`scripts/smoke-vercel.ps1`)

## Contact and Communication

- [x] `/api/contact` route with server validation
- [x] Honeypot anti-spam field
- [x] Resend-ready mode with safe fallback when key not configured
- [x] Contact page wired to client form submit flow

## Validation Snapshot

- [x] `npm run lint` passes in `apps/web`
- [x] Deployed smoke test passes on `https://geargrit.vercel.app`
- [ ] `npm run build` pass captured in unrestricted network runtime
  - Prior local blocker: Google Font fetch in restricted environment.

## Remaining for Final M3 Exit

- [ ] Publish target launch content volume in Sanity for MVP release.
- [ ] Final manual QA across mobile + desktop on all priority routes.
- [ ] Confirm production env parity for all required integrations.
- [ ] Freeze M3 scope and create `v1.0.0-rc` then `v1.0.0` release tags.