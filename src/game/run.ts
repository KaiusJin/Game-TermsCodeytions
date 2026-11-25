import { levelIds, levelMeta } from '../content/levels';
import type { Tier } from './types';

/** How many levels each difficulty tier contributes to one 15-level playthrough. */
export const tierQuota: Record<Tier, number> = { 1: 3, 2: 3, 3: 4, 4: 3, 5: 2 };

function shuffle<T>(items: T[], random: () => number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** Draws a fresh random run that still ramps up in difficulty. */
export function pickRun(random: () => number = Math.random): string[] {
  return ([1, 2, 3, 4, 5] as const).flatMap(tier =>
    shuffle(levelIds.filter(id => levelMeta[id].tier === tier), random).slice(0, tierQuota[tier]));
}
