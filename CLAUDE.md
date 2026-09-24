# Project Instructions for AI Agents

This file provides instructions and context for AI coding agents working on this project.

<!-- BEGIN BEADS INTEGRATION v:1 profile:minimal hash:970c3bf2 -->
## Beads Issue Tracker

This project uses **bd (beads)** for issue tracking. Run `bd prime` to see full workflow context and commands.

### Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --claim  # Claim work
bd close <id>         # Complete work
```

### Rules

- Use `bd` for ALL task tracking — do NOT use TodoWrite, TaskCreate, or markdown TODO lists
- Run `bd prime` for detailed command reference and session close protocol
- Use `bd remember` for persistent knowledge — do NOT use MEMORY.md files

**Architecture in one line:** issues live in a local Dolt DB; sync uses `refs/dolt/data` on your git remote; `.beads/issues.jsonl` is a passive export. See https://github.com/gastownhall/beads/blob/main/docs/SYNC_CONCEPTS.md for details and anti-patterns.

## Agent Context Profiles

The managed Beads block is task-tracking guidance, not permission to override repository, user, or orchestrator instructions.

- **Conservative (default)**: Use `bd` for task tracking. Do not run git commits, git pushes, or Dolt remote sync unless explicitly asked. At handoff, report changed files, validation, and suggested next commands.
- **Minimal**: Keep tool instruction files as pointers to `bd prime`; use the same conservative git policy unless active instructions say otherwise.
- **Team-maintainer**: Only when the repository explicitly opts in, agents may close beads, run quality gates, commit, and push as part of session close. A current "do not commit" or "do not push" instruction still wins.

## Session Completion

This protocol applies when ending a Beads implementation workflow. It is subordinate to explicit user, repository, and orchestrator instructions.

1. **File issues for remaining work** - Create beads for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **Handle git/sync by active profile**:
   ```bash
   # Conservative/minimal/default: report status and proposed commands; wait for approval.
   git status

   # Team-maintainer opt-in only, unless current instructions forbid it:
   git pull --rebase
   bd dolt push
   git push
   git status
   ```
5. **Hand off** - Summarize changes, validation, issue status, and any blocked sync/commit/push step

**Critical rules:**
- Explicit user or orchestrator instructions override this Beads block.
- Do not commit or push without clear authority from the active profile or the current user request.
- If a required sync or push is blocked, stop and report the exact command and error.
<!-- END BEADS INTEGRATION -->


## Build & Test

```bash
corepack enable
yarn install --immutable
yarn build        # astro check + astro build (the check gate)
yarn dev          # static site only; the API needs wrangler (below)
npx wrangler dev  # full stack on :8787 — apply the local schema first:
npx wrangler d1 migrations apply jobfiend-signups --local
```

## Architecture Overview

Astro static site (`src/`) built to `dist/` and served by a Cloudflare Worker
(`worker/index.ts`) with the `ASSETS` binding. Deploys run in GitHub Actions
(`.github/workflows/preview.yml`): every PR gets a preview Worker
(`jobfiend-pr-<N>.<account-subdomain>.workers.dev`), every push to `main`
deploys production (jobfiend.io). The CI `CLOUDFLARE_API_TOKEN` is scoped to
Worker deploys only — it cannot create or inspect D1 databases; that needs a
user OAuth login (`wrangler login`).

### Where the intake data lives

`POST /api/intake` (same Worker) stores **every** intake submit — both
"Book a setup" intents (status `booking`) and waitlist signups — in the D1
database `jobfiend-signups`. **This is the source of record for both flows.**
cal.com booking notes are a convenience copy; nothing about a booking flows
back from cal.com.

Read submissions:

```bash
env -u CLOUDFLARE_API_TOKEN npx wrangler d1 execute jobfiend-signups \
  --remote --command "SELECT * FROM signups ORDER BY created_at DESC"
```

In this sandbox the `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` env vars
hold placeholder values that poison wrangler — unset them (`env -u`) so
wrangler falls back to the stored OAuth login.

Schema (`migrations/0001_signups.sql`): `signups(id, created_at, status
booking|waitlist, level junior|mid|senior, region eu|na|other, looking, email)`.
A filled honeypot field (`website`) gets a fake 204 and stores nothing.
Schema changes go through `wrangler d1 migrations` (`migrations/`): apply
with `--local` for dev and `--remote` for production after merging the
migration file.

## Conventions & Patterns

_Add your project-specific conventions here_
