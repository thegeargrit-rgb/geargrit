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
| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, TypeScript strict) |
| Styling | Tailwind CSS v4 + shadcn/ui |
| CMS | Sanity.io v3 |
| Database | Supabase (PostgreSQL) |
| Search | Algolia (free tier → growth) |
| Auth | NextAuth.js v5 |
| Hosting | Vercel (frontend) |
| Images/CDN | Cloudinary + next/image |
| Analytics | Google Analytics 4 + Vercel Analytics |
| Affiliate Links | Custom /go/[slug] redirect via Supabase + Next.js middleware |
| Email | Resend + React Email |
| Testing | Vitest (unit) + Playwright (E2E) |
| CI/CD | GitHub Actions → Vercel |
| Package Manager | pnpm |
| Monorepo | Turborepo |

---

## 📁 REPO STRUCTURE (TARGET)
```
geargrit/
├── apps/web/              # Next.js 15 app
├── packages/db/           # Supabase migrations + generated types
├── packages/config/       # Shared ESLint, TS config
├── docs/                  # ADRs, context, session logs
├── .github/               # CI/CD workflows, PR template
└── scripts/               # Seed scripts, sitemap generator
```

---

## 🗓️ MILESTONE STATUS
| Milestone | Version | Status | Started | Completed |
|---|---|---|---|---|
| M1: Foundation & Design System | v0.1.0-alpha | 🔄 IN PROGRESS | 2026-03-08 | — |
| M2: Core Content Engine | v0.2.0-alpha | ⏳ NOT STARTED | — | — |
| M3: MVP Launch | v1.0.0 | ⏳ NOT STARTED | — | — |
| M4: SEO Scale & Growth | v1.1.0 | ⏳ NOT STARTED | — | — |
| M5: Affiliate Optimization | v1.2.0 | ⏳ NOT STARTED | — | — |
| M6: Advanced UX Features | v2.0.0 | ⏳ NOT STARTED | — | — |
| M7: Monetization Expansion | v2.1.0 | ⏳ NOT STARTED | — | — |
| M8: Performance & Scale | v2.2.0 | ⏳ NOT STARTED | — | — |
| M9: Advanced Features | v3.0.0 | ⏳ NOT STARTED | — | — |

---

## ✅ M1 TASK CHECKLIST
- [x] Create GitHub repo (geargrit)
- [x] Push CONTEXT.md, SESSION_LOG.md, ADR-001
- [ ] Setup Next.js 15 app (App Router, TypeScript strict, pnpm)
- [ ] Setup Turborepo monorepo
- [ ] Install + configure Tailwind CSS v4
- [ ] Install + configure shadcn/ui
- [ ] Setup Sanity.io project + studio
- [ ] Setup Supabase project + base migrations
- [ ] Setup GitHub Actions CI pipeline
- [ ] Configure Vercel deployment (staging + production)
- [ ] Setup Cloudinary account + next/image config
- [ ] Build core components: Header, Footer, Button, Card, Badge, ScoreBadge
- [ ] Build homepage shell (no real content yet)
- [ ] Configure next-sitemap
- [ ] Configure robots.txt
- [ ] Setup ESLint + Prettier + Husky pre-commit hooks
- [ ] Design tokens: brand colors, typography, spacing

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
| Date | Decision | Reason |
|---|---|---|
| 2026-03-08 | Chose Next.js 15 over Astro | Better ISR support, larger ecosystem, hybrid static/dynamic |
| 2026-03-08 | Chose Supabase over PlanetScale | Free tier, built-in auth, real-time, RLS |
| 2026-03-08 | Chose Sanity.io over Contentful | Better free tier, GROQ queries, structured content |
| 2026-03-08 | Unified domain (geargrit.com) | Domain authority compounds across both niches |
| 2026-03-08 | pnpm + Turborepo | Fast installs, monorepo for future packages/db |

---

## 🚨 CURRENT BLOCKERS / TO-DO BEFORE CODING
- [ ] Apply for Amazon Associates India account
- [ ] Purchase geargrit.com domain
- [ ] Create Vercel account (if not done)
- [ ] Create Supabase account (if not done)
- [ ] Create Sanity.io account (if not done)
- [ ] Install Node.js 20+ locally
- [ ] Install pnpm globally: npm install -g pnpm

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