# M2 Sprint Plan (Core Content Engine)

Last updated: 2026-03-08
Target version: v0.2.0-alpha

## Sprint 1 (Completed)

- [x] Final taxonomy draft for badminton + trekking (initial baseline).
- [x] Sanity schema baseline (category, brand, author, product, review, guide).
- [x] Shared SEO object and disclosure block schema.
- [x] Base GROQ query helpers in `apps/web`.
- [x] Typed Sanity loader layer and fallback behavior.
- [x] Homepage wired to Sanity data with empty states.

## Sprint 2 (Completed)

- [x] Supabase schema baseline (`affiliate_links`, `click_events`).
- [x] `/go/[slug]` route contract and lookup helper.
- [x] Click logging pipeline to `click_events`.
- [x] Seed sample entities (categories, brands, author, products, review, guide).
- [x] Sanity fallback for affiliate link lookup.

## Sprint 3 (Completed)

- [x] Category/review/guide dynamic slug pages.
- [x] Category/review/guide listing pages.
- [x] Editorial empty states for missing content.
- [x] Affiliate health founder dashboard (`/admin/affiliate-health`).
- [x] Admin auth gate via `proxy.ts` for `/admin/*`.
- [x] Anti-abuse baseline for `/go/[slug]` (bot guard + rate limit).

## M2 Remaining (Before Release Tag)

- [ ] Add `redirect_logs` table and integrate optional write path.
- [ ] Add basic automated tests for `/go/[slug]` happy path + rate limit behavior.
- [ ] Add a small migration/runbook doc for Supabase setup from scratch.
- [ ] Final M2 release QA pass and tag `v0.2.0-alpha`.

## Current Session Next Build Target

- Add `/go/[slug]` test coverage and finalize release checklist for M2.
