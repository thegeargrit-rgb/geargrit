# Versioning and Work Progress Workflow

Last updated: 2026-03-08

## Goal

Save progress safely every work session using lightweight checkpoints, then promote stable milestones to release tags.

## Branch Strategy

- Main branch: `main`
- Feature branch format: `codex/m{milestone}-{short-topic}`
- Example: `codex/m2-sanity-schema-core`

## Commit Strategy

Use small, descriptive commits.

Commit format:

- `feat(m2): add base category and product schemas`
- `fix(ui): remove asChild prop leak in header button`
- `chore(docs): update roadmap and session log`

## Checkpoint Tags (work in progress)

Use checkpoint tags whenever a meaningful chunk is complete.

Tag format:

- `checkpoint/YYYYMMDD-N`
- Example: `checkpoint/20260308-1`

Commands:

```powershell
git add -A
git commit -m "chore(checkpoint): m2 schema baseline"
git tag -a checkpoint/20260308-1 -m "M2 schema baseline"
git push origin main --follow-tags
```

## Milestone Release Tags

When a milestone is done, create a release tag.

Tag format:

- `v0.2.0-alpha`, `v1.0.0`, `v1.1.0`, etc.

Commands:

```powershell
git add -A
git commit -m "release: v0.2.0-alpha"
git tag -a v0.2.0-alpha -m "M2 complete: Core Content Engine"
git push origin main --follow-tags
```

## Solo Founder Safety Checklist Before Each Tag

- `pnpm --filter web lint` passes.
- `pnpm --filter web build` passes.
- `docs/SESSION_LOG.md` has today update.
- `docs/CONTEXT.md` milestone status updated.

## Definition of Done for Any Task

- Implemented.
- Typed and lint-clean.
- Basic happy-path verified.
- Logged in docs.
- Checkpointed in git.
