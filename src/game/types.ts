import type { ComponentType } from 'react';

export type LevelProps = { onSolved: () => void; onFailed: () => void };

export type Tier = 1 | 2 | 3 | 4 | 5;

export type LevelMeta = {
  title: string;
  /** The agreement's clauses, shown above the play area. Clues hide in here, in legal voice. */
  terms: readonly string[];
  tier: Tier;
  /** Seconds per attempt; defaults to 20. */
  seconds?: number;
  codey: string;
  hints: readonly [string, string];
  /** Shown only in the hidden answer drawer. */
  answer: string;
};

export type LevelDef = LevelMeta & { id: string; Component: ComponentType<LevelProps> };
