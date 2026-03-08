## Pull Request Checklist

### 📋 Description
<!-- What does this PR do? Be specific. -->

### 🎯 Linked Milestone Issue
<!-- e.g. Closes #12 -->
Closes #

### 📸 Screenshots / Video
<!-- Required for ALL UI changes. Use Chrome DevTools mobile view too. -->

| Desktop | Mobile |
|---|---|
| | |

### ✅ Pre-Merge Checklist
- [ ] CI pipeline passes (lint, type-check, tests, build)
- [ ] Lighthouse scores checked: Perf ≥ 90, A11y ≥ 95, SEO = 100
- [ ] Tested on mobile (Chrome DevTools – iPhone 12 preset)
- [ ] No TypeScript `any` types added
- [ ] No hardcoded Amazon/affiliate URLs (must use `/go/[slug]`)
- [ ] FTC disclosure present on pages with affiliate links
- [ ] Schema markup validated (if applicable)
- [ ] No console errors in browser
- [ ] `pnpm build` passes locally

### 🔍 Type of Change
- [ ] ✨ New feature
- [ ] 🐛 Bug fix
- [ ] 📝 Content (review/guide/product)
- [ ] 🎨 UI/UX improvement
- [ ] ⚡ Performance improvement
- [ ] 🔧 Chore / Refactor
- [ ] 📖 Documentation
- [ ] 🚀 CI/CD / DevOps

### 📝 Notes for Reviewer
<!-- Anything specific to check or be aware of? -->