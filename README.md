# Terms & Codeytions

A browser puzzle game for the University of Waterloo Computer Science Club. Every screen is an agreement, and every agreement hides a different way to click **Agree**.

- 80 agreements across five difficulty tiers; each run draws 15 at random, easiest first.
- Clues live in the fine print, with two levels of optional hints per agreement.
- Timed attempts, Codey reactions, synthesized stamp sounds, and a shareable end-of-run result.
- Built with React, TypeScript, Vite and Framer Motion. Fully static, with no backend.

## Getting started

Requires Node.js 22.12 or newer.

```sh
npm install
npm run dev
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run typecheck` | Type-check the project |
| `npm run lint` | Run ESLint |
| `npm run test` | Run unit tests (Vitest) |
| `npm run test:e2e` | Solve all 80 agreements in a browser (Playwright, against the production build) |
| `npm run build` | Build the static site into `dist/` |
| `npm run preview` | Serve the production build locally |

Before the first e2e run, install the browser with `npx playwright install chromium`.

## Playtesting

A hidden answer key shows the solution to the current agreement and lets you jump to any of the 80. To toggle it, type `codey` anywhere outside a text field, or click the ✳ in the footer five times quickly.

## Deployment

`wrangler.jsonc` deploys `dist/` as a static site on Cloudflare Workers. Build with `npm run build`, then deploy with `npx wrangler deploy`.

## Project layout

| Path | Contents |
| --- | --- |
| `src/content/levels.ts` | Clauses, hints, answers, tier and time limit for every agreement |
| `src/content/en.ts` | Interface copy |
| `src/levels/tierN/` | One component and stylesheet per agreement |
| `src/levels/shared/` | Controls, illustrations and styles shared by several agreements |
| `src/game/` | Game flow, run selection, scoring and the level registry |
| `src/components/` | Page-level and shared interface components |
| `e2e/` | Playwright solve script for each agreement |

See [docs/architecture.md](docs/architecture.md) for how the pieces fit together, [Agent.md](Agent.md) for contribution conventions, and [docs/assets.md](docs/assets.md) for artwork credits.
