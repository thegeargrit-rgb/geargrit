# v1.0.0-rc Readiness Checklist

Date: 2026-03-09

## Required to Cut `v1.0.0-rc`

- [x] M3 technical architecture delivered and deployed.
- [x] Core smoke tests passing on production URL.
- [x] SEO baseline in place (metadata/canonical/robots/sitemap).
- [x] Redirect and affiliate logging flows validated.
- [x] Admin dashboard route protected and reachable with auth.
- [ ] Final launch content set published in Sanity.
- [ ] Manual cross-device QA pass signed off.
- [ ] Optional: build verification in unrestricted network runtime.

## RC Tag Commands

```powershell
git pull --ff-only
npm run lint --workspace apps/web
git tag v1.0.0-rc
git push origin main --follow-tags
```

## Final `v1.0.0` Tag Commands

```powershell
git pull --ff-only
git tag v1.0.0
git push origin v1.0.0
```