# Contribution guide

Conventions for anyone, human or agent, working on Terms & Codeytions. See [docs/architecture.md](docs/architecture.md) for the structure.

## Goal

A browser puzzle game for the UWaterloo Computer Science Club, inspired by "click Agree" puzzle games. Players read humorous agreements and work out how to click **Agree**. Rules are easy to grasp, the interface surprises, and every solution is clued, repeatable and finishable. Difficulty comes from understanding the interaction, not from precise timing or long waits.

The interface is in English and all copy lives in `src/content/`.

## Code style

- React function components with strict TypeScript. Avoid `any`, duplicated state and needless type assertions.
- PascalCase for components and types, camelCase for values, stable kebab-case for level ids.
- CSS Modules for component styles. Framer Motion for motion, plain CSS for simple hover and colour changes.
- `useReducer` for game flow and `useState` inside levels. No Redux, routers, drag libraries or UI kits.
- Do not mutate the DOM to hold game state. Refs are fine for measuring, focus and pointer capture.
- Clean up every timer, listener and animation subscription. Strict Mode must never advance a level twice.
- Comments explain puzzle rules, edge cases and non-obvious decisions, not what the code does.
- Extract a hook or helper only once something is genuinely reused.

## Agreement rules

1. Every agreement has clauses, an initial state, a clue, an unlock condition, a final Agree action, reset behaviour and a keyboard path.
2. Meeting the condition is not enough: the player still activates Agree.
3. Success fires once and shows the Agree stamp. Failure shows the Disagree stamp and resets only that agreement.
4. Agree may move, hide or be covered, but it never leaves the play area for good or becomes unsolvable.
5. Never depend on reloading, real dev tools, browser permissions or system settings.
6. Write clauses as 2–3 legal-style terms with the clue hidden in the wording. State a rule outright only when the rule is the puzzle.
7. Hints live behind "Need a little nudge": a subtle first hint, then an explicit second one. Feedback comes from control states and stamps, never from status text under the level.
8. Attempts are timed: 30 seconds by default, or longer via `seconds` in the metadata.
9. Decorative motion never decides the outcome. Every agreement is completable with reduced motion.

## Visuals and assets

- CSC blue and white: white paper, navy text, blue primary buttons, light-blue accents.
- Keep Codey and the CSC logo in their original shapes, proportions and colours. Codey uses they/them.
- Copy only the assets you use into `public/assets/` and record their source in `docs/assets.md`.
- Decorative images get an empty `alt`. Interactive images sit inside buttons with an accessible name.

## Verification

Run the checks relevant to a change:

```sh
npm run typecheck && npm run lint && npm run test && npm run build
npm run test:e2e   # when an agreement's behaviour changes
```

Before shipping, every agreement must be solvable and retryable, progress must survive a reload, the game must stay playable when storage is blocked, and the production build must load with no console errors. Report what changed, what was verified and what was not.

## Git

- Reading history, diffs and remotes is fine.
- Committing, pushing and opening or editing pull requests each need the maintainer's explicit approval for that action. A request to implement or fix something is not approval to commit.
- Use `fetch`, not `pull`. Merges, rebases and other history rewrites also need approval.
