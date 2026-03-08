# GearGrit.com — AI Context Memory File

> Last Updated: 2026-03-08
> Founder: rajasthanindienreise
> Domain: geargrit.com

---

## 🧠 HOW TO USE THIS FILE

Paste the contents of this file at the START of every new AI chat session.
Use this prompt to start every session:

> "I am building GearGrit.com — an affiliate marketing website for badminton and trekking gear. Here is my full project context: [paste this file]. Today I want to work on: [your task]."

---

## 🏗️ PROJECT OVERVIEW

- **Site:** geargrit.com
- **Type:** Affiliate marketing website (Amazon Associates + multi-network)
- **Niches:** Badminton gear + Trekking gear
- **Business Model:** Affiliate commissions (primary), display ads (growth), sponsored content (advanced)
- **Target Market:** India (primary), Global (secondary)
- **GitHub Repo:** https://github.com/rajasthanindienreise/geargrit (private)

---

## 🛠️ TECH STACK (DECIDED — DO NOT CHANGE WITHOUT ADR)

| Layer           | Choice                                                       |
| --------------- | ------------------------------------------------------------ |
| Framework       | Next.js 16 (App Router, TypeScript strict)                   |
| Styling         | Tailwind CSS v4 + shadcn/ui                                  |
| CMS             | Sanity.io v3                                                 |
| Database        | Supabase (PostgreSQL)                                        |
| Search          | Algolia (free tier → growth)                                 |
| Auth            | NextAuth.js v5                                               |
| Hosting         | Vercel (frontend)                                            |
| Images/CDN      | Cloudinary + next/image                                      |
| Analytics       | Google Analytics 4 + Vercel Analytics                        |
| Affiliate Links | Custom /go/[slug] redirect via Supabase + Next.js middleware |
| Email           | Resend + React Email                                         |
| Testing         | Vitest (unit) + Playwright (E2E)                             |
| CI/CD           | GitHub Actions → Vercel                                      |
| Package Manager | pnpm@10.31.0                                                 |
| Monorepo        | Turborepo v2                                                 |

---

## 📁 REPO STRUCTURE (CURRENT — AS OF 2026-03-08)

```
geargrit/
├── apps/
│   └── web/               # Next.js 16 app (App Router, TypeScript, Tailwind v4, shadcn/ui)
│       ├── components/ui/ # shadcn/ui components (button.tsx added)
│       └── lib/utils.ts   # shadcn/ui utility (cn helper)
├── packages/
│   ├── db/                # Supabase migrations + generated types (shell)
│   └── config/            # Shared ESLint, TS config (shell)
├── docs/                  # ADRs, context, session logs
├── .github/               # CI/CD workflows, PR template, Husky hooks
└── scripts/               # Seed scripts, sitemap generator (coming soon)
```

---

## 🗓️ MILESTONE STATUS

| Milestone                      | Version      | Status         | Started    | Completed |
| ------------------------------ | ------------ | -------------- | ---------- | --------- |
| M1: Foundation & Design System | v0.1.0-alpha | ✅ COMPLETED   | 2026-03-08 | —         |
| M2: Core Content Engine        | v0.2.0-alpha | ⏳ NOT STARTED | —          | —         |
| M3: MVP Launch                 | v1.0.0       | ⏳ NOT STARTED | —          | —         |
| M4: SEO Scale & Growth         | v1.1.0       | ⏳ NOT STARTED | —          | —         |
| M5: Affiliate Optimization     | v1.2.0       | ⏳ NOT STARTED | —          | —         |
| M6: Advanced UX Features       | v2.0.0       | ⏳ NOT STARTED | —          | —         |
| M7: Monetization Expansion     | v2.1.0       | ⏳ NOT STARTED | —          | —         |
| M8: Performance & Scale        | v2.2.0       | ⏳ NOT STARTED | —          | —         |
| M9: Advanced Features          | v3.0.0       | ⏳ NOT STARTED | —          | —         |

---

## ✅ M1 TASK CHECKLIST

- [x] Create GitHub repo (geargrit)
- [x] Push CONTEXT.md, SESSION_LOG.md, ADR-001
- [x] Setup Next.js 16 app (App Router, TypeScript strict, pnpm) ✅ 2026-03-08
- [x] Setup Turborepo monorepo ✅ 2026-03-08
- [x] Install + configure Tailwind CSS v4 ✅ 2026-03-08 (auto-installed with Next.js 16)
- [x] Install + configure shadcn/ui ✅ 2026-03-08 (Radix, default preset, CSS variables)
- [x] Setup ESLint + Prettier + Husky pre-commit hooks ✅ 2026-03-08
- [ ] Design tokens: brand colors, typography, spacing
- [ ] Build core components: Header, Footer, Button, Card, Badge, ScoreBadge
- [ ] Build homepage shell (no real content yet)
- [ ] Setup Sanity.io project + studio
- [ ] Setup Supabase project + base migrations
- [ ] Setup GitHub Actions CI pipeline
- [ ] Configure Vercel deployment (staging + production)
- [ ] Setup Cloudinary account + next/image config
- [ ] Configure next-sitemap
- [ ] Configure robots.txt

---

## 🎨 BRAND & DESIGN DECISIONS

- **Primary Color:** Deep Forest Green (#1B4332) — represents outdoors/trekking
- **Accent Color:** Smash Orange (#F97316) — energy/badminton
- **Neutral:** Slate gray scale
- **Font:** Inter (body) + Sora (headings)
- **Tone:** Expert, trusted, direct — like a knowledgeable friend, not a salesperson
- **Logo Concept:** "GG" monogram with a racket + mountain silhouette

---

## 🔗 AFFILIATE STRATEGY

- **Primary Network:** Amazon Associates India (apply immediately)
- **Link Pattern:** geargrit.com/go/[slug] → Amazon URL
- **Disclosure:** Required on EVERY page with affiliate links
- **Click Tracking:** Supabase click_events table
- **Future Networks:** Flipkart, ShareASale, CJ Affiliate, Impact

---

## 📊 KEY DECISIONS LOG

| Date       | Decision                           | Reason                                                                 |
| ---------- | ---------------------------------- | ---------------------------------------------------------------------- |
| 2026-03-08 | Chose Next.js 15 over Astro        | Better ISR support, larger ecosystem, hybrid static/dynamic            |
| 2026-03-08 | Chose Supabase over PlanetScale    | Free tier, built-in auth, real-time, RLS                               |
| 2026-03-08 | Chose Sanity.io over Contentful    | Better free tier, GROQ queries, structured content                     |
| 2026-03-08 | Unified domain (geargrit.com)      | Domain authority compounds across both niches                          |
| 2026-03-08 | pnpm + Turborepo                   | Fast installs, monorepo for future packages/db                         |
| 2026-03-08 | Next.js version is 16.1.6          | create-next-app scaffolded v16 (latest stable) — keeping it            |
| 2026-03-08 | Tailwind v4 auto-installed         | Next.js 16 scaffold included Tailwind v4 by default                    |
| 2026-03-08 | turbo.json uses tasks not pipeline | Turbo v2 breaking change — renamed pipeline to tasks                   |
| 2026-03-08 | packageManager field required      | Turbo v2 requires packageManager in root package.json                  |
| 2026-03-08 | shadcn/ui Radix + default preset   | Full control over brand colors; presets don't match GearGrit design    |
| 2026-03-08 | Husky v9 + lint-staged v15         | Pre-commit hooks: ESLint + Prettier on ts/tsx, Prettier on md/json/css |

---

## 🚨 CURRENT BLOCKERS / TO-DO BEFORE CODING

- [ ] Apply for Amazon Associates India account
- [ ] Purchase geargrit.com domain
- [ ] Create Vercel account (if not done)
- [ ] Create Supabase account (if not done)
- [ ] Create Sanity.io account (if not done)

---

## 📝 NOTES FOR AI ASSISTANT

- This is a SOLO FOUNDER project — all code written by one person using AI assistance
- Prefer simple, readable code over clever abstractions
- Always use TypeScript strict mode
- Always use Server Components by default, Client Components only when needed
- Every component must be mobile-first
- All affiliate links must go through /go/[slug] — never hardcode Amazon URLs
- FTC disclosure must appear on every page that has affiliate links
- Keep Lighthouse scores: Perf ≥ 90, A11y ≥ 95, SEO = 100
- Stack is LOCKED — no changes without creating an ADR in docs/decisions/
- AI must ALWAYS use PowerShell commands (never bash/Linux syntax)
- AI must update CONTEXT.md and SESSION_LOG.md on GitHub after every milestone step
- Local path: C:\thegeargrit\geargrit\
