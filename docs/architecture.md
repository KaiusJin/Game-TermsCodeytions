# Architecture

Terms & Codeytions is a static single-page app. React manages all state and `localStorage` keeps minimal progress, so there is no backend.

## Game flow

Home → a run of 15 agreements → finish screen.

- `pickRun` draws 3, 3, 4, 3 and 2 agreements from tiers 1 to 5, so difficulty rises through the run.
- Each attempt has a deadline: 30 seconds by default, or the agreement's own `seconds` value.
- Solving an agreement shows the Agree stamp and moves on. Failing or timing out shows the Disagree stamp and restarts only that agreement.
- The run tracks Disagrees per agreement and total time. The finish screen turns these into stats and a copyable result grid.
- The answer key can start a one-agreement practice run, which does not count toward completion.

## Source layout

```text
src/
├── App.tsx              # Screens, timer, and wiring between flow and UI
├── main.tsx             # Entry point; loads Framer Motion features lazily
├── assets.ts            # URLs for files in public/assets
├── motionFeatures.ts    # Framer Motion feature bundle, loaded on demand
├── sound/               # Synthesized stamp sounds and the sound setting
├── components/          # Agreement frame, toolbar, stamp overlay, finish screen, dialogs
│   └── answerKey/       # Hidden answer key and its secret triggers
├── content/
│   ├── en.ts            # Interface copy
│   └── levels.ts        # Agreement metadata (pure data)
├── game/
│   ├── types.ts         # Level types
│   ├── state.ts         # Flow reducer and progress storage
│   ├── run.ts           # Random run selection
│   ├── share.ts         # Time formatting and share text
│   └── levels.ts        # Registry: metadata plus lazily loaded components
├── levels/
│   ├── shared/          # Buttons, stage, illustrations, code-editor styles
│   └── tier1/ … tier5/  # One component and stylesheet per agreement
└── styles/global.css    # Theme tokens and global styles

e2e/levels.spec.ts       # One Playwright solve script per agreement
public/assets/           # Codey illustrations and the CSC logo
```

## Boundaries

- **Content is data.** `content/levels.ts` holds every agreement's clauses, hints, answer, tier and time limit, and imports no components.
- **Game logic depends only on content.** `state.ts`, `run.ts` and `share.ts` never import React components, so they are unit-tested in isolation.
- **Levels are self-contained.** A level receives `onSolved` and `onFailed` and owns its own state, timers and styles. `App` never branches on which level is active.
- **Levels load on demand.** Each agreement is its own chunk. Starting a run preloads its 15 agreements, so the first page load carries only the shell.

## Adding an agreement

1. Add its metadata to `src/content/levels.ts`.
2. Create `src/levels/tierN/Name.tsx` and `Name.module.css`.
3. Register the loader in `src/game/levels.ts`.
4. Add a solve script to `e2e/levels.spec.ts`. The type checker flags a missing one.

## Visual language

A clean online-agreement form in CSC blue and white: white paper, navy text, blue primary buttons and light-blue accents, with the CSC logo and Codey. Animation supports the puzzles and the humour. Every agreement stays completable with reduced motion.
