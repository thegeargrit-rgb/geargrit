# 9-Month Execution Roadmap (Founder-Friendly)

Last updated: 2026-03-08
Owner: Solo Founder + AI Pair Developer

## Mission

Build and scale thegeargrit.com from foundation to a scalable affiliate content engine in 9 months.

## Timeline

### Month 1 (M2: Core Content Engine, v0.2.0-alpha)

- Finalize taxonomy for badminton + trekking.
- Complete Sanity schemas and base editorial workflow.
- Set up Supabase tables for affiliate redirects + click tracking.
- Wire homepage to Sanity data.
- Add sample seed data.

Exit criteria:

- Content editors can create category, product, review, and guide documents.
- `/` loads typed CMS content without hardcoded placeholders.
- `/go/[slug]` reads data source contract (even if full middleware comes in M3).

### Months 2-3 (M3: MVP Launch, v1.0.0)

- Build all public templates (hub/category/review/guide/comparison/article/brand).
- Launch affiliate disclosure patterns and core trust blocks.
- Ship SEO essentials: metadata, sitemap, robots, canonical, 404.
- Publish first meaningful content set.

Exit criteria:

- Production launch ready with core legal and technical pages.
- Initial affiliate funnel live with tracking baseline.

### Month 4 (M4: SEO Scale, v1.1.0)

- Cluster strategy and internal linking system.
- Structured data for review/article/faq/breadcrumb.
- Author/topic archive and refresh workflows.

### Month 5 (M5: Affiliate Optimization, v1.2.0)

- Harden `/go/[slug]` redirect + logging pipeline.
- Add multi-network-ready affiliate metadata model.
- Introduce CTA testing strategy.

### Month 6 (M6: Advanced UX, v2.0.0)

- Algolia integration and filterable discovery UX.
- Better mobile comparison and long-form navigation UX.
- Newsletter capture and email flow.

### Month 7 (M7: Monetization Expansion, v2.1.0)

- Merchant prioritization logic and monetization reporting.
- Sponsored content governance and labeling.

### Month 8 (M8: Performance & Scale, v2.2.0)

- Core Web Vitals hardening.
- Security headers, monitoring, bundle audits.
- DB query/index and redirect abuse protection review.

### Month 9 (M9: Advanced Features, v3.0.0)

- Add only validated advanced features.
- Build operator dashboards and maintenance SOPs.

## Weekly Operating Rhythm

- Monday: plan + define acceptance criteria.
- Tuesday-Thursday: build + test + ship checkpoint tags.
- Friday: quality pass + milestone tracking update + release notes.

## Founder Rule

Never block on perfection. Ship small validated increments with versioned checkpoints.
