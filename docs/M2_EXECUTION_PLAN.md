# M2 Sprint Plan (Core Content Engine)

Last updated: 2026-03-08
Target version: v0.2.0-alpha

## Sprint 1 (Now)

- [ ] Final taxonomy draft for badminton + trekking.
- [ ] Sanity schema baseline (category, brand, author, product, review, guide).
- [ ] Shared SEO object and disclosure block schema.
- [ ] Base GROQ query helpers in `apps/web`.

## Sprint 2

- [ ] Supabase schema baseline (`affiliate_links`, `click_events`, `redirect_logs`).
- [ ] `/go/[slug]` route contract and lookup helper.
- [ ] Seed sample entities (2 categories, 3 brands, 5 products, 3 reviews).

## Sprint 3

- [ ] Homepage wired to Sanity with fallback states.
- [ ] Editorial empty states for incomplete sections.
- [ ] Type-safe content loaders and query boundaries.

## Current Session Next Build Target

Start with: taxonomy + schema baseline.

Acceptance criteria:

- At least 6 core schema types active in Studio.
- Validation on required editorial fields.
- Slug strategy defined and enforced in schema.
