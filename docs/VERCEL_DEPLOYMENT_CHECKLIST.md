# Vercel Deployment Checklist (M3)

Date: 2026-03-08

## 1) Create Vercel Project

1. Go to Vercel dashboard and import `thegeargrit-rgb/geargrit`.
2. Framework preset: `Next.js`.
3. Root directory: `apps/web`.
4. Build command: `npm run build`.
5. Output directory: default (`.next`).

## 2) Add Environment Variables (Vercel)

Use values from `apps/web/.env.local` and `apps/web/.env.example`.

Required for current features:
- `NEXT_PUBLIC_SITE_URL` (set staging URL in Preview, production URL in Production)
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_BASIC_AUTH_USER`
- `ADMIN_BASIC_AUTH_PASS`

Required for Cloudinary readiness:
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`

## 3) Deploy and Smoke Test

After first deployment, verify:
- `/api/health` returns `{ "status": "ok" }`.
- `/` loads with CMS fallback/content.
- `/categories`, `/reviews`, `/guides` load.
- `/go/test-yonex` redirects and logs clicks.
- `/admin/affiliate-health` prompts auth and loads after valid credentials.
- `/robots.txt` and `/sitemap.xml` are reachable.
- unknown URL (example `/random-404-test`) shows custom 404 page.

## 4) Domain Mapping

1. Add `thegeargrit.com` in Vercel project domains.
2. Add `www.thegeargrit.com` and configure redirect strategy (www -> apex or apex -> www).
3. Update `NEXT_PUBLIC_SITE_URL` in Production to canonical domain.

## 5) Pre-Launch Gate

Before public launch:
- Ensure legal pages exist and are linked.
- Verify no secret keys are exposed client-side.
- Confirm admin credentials differ between Preview and Production.
- Re-run `npm run lint` and `npm run build` locally.
## 6) Quick Cloudinary Test

1. Add `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` in Vercel env.
2. Use `CloudinaryImage` component in any page with a known `publicId`.
3. Confirm image URL resolves from `https://res.cloudinary.com/<cloud>/image/upload/...`.
4. Confirm optimized format in browser network (`webp` or `avif` when supported).