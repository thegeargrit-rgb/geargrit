# ADR-001: Tech Stack Selection for GearGrit.com
**Date:** 2026-03-08
**Status:** Accepted
**Author:** rajasthanindienreise (Founder)

---

## Context
GearGrit.com is an SEO-first affiliate marketing website covering badminton and trekking gear.
Built by a solo founder using AI-assisted (vibe) coding. Stack must be:
- SEO-optimized out of the box
- Fast to iterate with AI assistance
- Production-grade and scalable
- Cost-efficient at early stage (free tiers preferred)
- Easy to deploy without DevOps expertise

---

## Decision

### Framework: Next.js 15 (App Router)
**Chosen over:** Astro, Remix, Gatsby
**Reason:** React Server Components give zero-JS server rendering by default (Astro-level performance), ISR enables affiliate price updates without full rebuilds, largest ecosystem, best Vercel integration, hybrid static+dynamic is essential for affiliate sites.

### Styling: Tailwind CSS v4 + shadcn/ui
**Chosen over:** CSS Modules, Styled Components, Chakra UI
**Reason:** Zero runtime CSS = best Lighthouse performance. shadcn/ui gives accessible, production-ready components without vendor lock-in. Perfect for vibe coding.

### CMS: Sanity.io v3
**Chosen over:** Contentful, Strapi, WordPress, Payload
**Reason:** Free tier is generous for solo founder. GROQ query language is powerful. Structured content = SEO metadata as first-class field.

### Database: Supabase (PostgreSQL)
**Chosen over:** PlanetScale, Railway, Neon, Firebase
**Reason:** Free tier, built-in REST + realtime APIs, Row Level Security, excellent CLI for migrations, generates TypeScript types automatically.

### Search: Algolia
**Chosen over:** Meilisearch, Typesense, Supabase full-text
**Reason:** Typo-tolerant, faceted filtering, instant search. Free tier covers MVP.

### Hosting: Vercel
**Chosen over:** Netlify, Railway, Cloudflare Pages, AWS
**Reason:** Zero-config Next.js deployment. Edge Network. Preview deployments per PR. Best DX for solo founder.

### Images/CDN: Cloudinary + next/image
**Chosen over:** imgix, Uploadcare, S3+CloudFront
**Reason:** Free 25GB. Auto WebP/AVIF conversion. Lazy loading. Responsive images = Lighthouse 100.

### Affiliate Links: Custom /go/[slug] Middleware
**Chosen over:** Pretty Links, Geniuslink, ThirstyAffiliates
**Reason:** No third-party lock-in. Full click tracking control. Network-agnostic.

### Package Manager: pnpm + Turborepo
**Chosen over:** npm, yarn, Bun
**Reason:** Fastest installs, disk-efficient, monorepo support.

---

## Consequences
- Stack is locked for M1-M3. Changes require a new ADR.
- All developers (AI or human) must follow this stack.
- No WordPress, no PHP, no page builders.
- TypeScript strict mode is non-negotiable.
