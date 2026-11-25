import { isLevelId, levelIds, levelMeta } from '../content/levels';

export type Screen = 'home' | 'playing' | 'solved' | 'failed' | 'finished';
export type GameState = {
  screen: Screen;
  completed: boolean;
  attempt: number;
  /** Level ids chosen for this playthrough, in play order. */
  run: string[];
  index: number;
  completedLevels: string[];
  deadline: number;
  practice: boolean;
};
export type GameAction =
  | { type: 'home' }
  | { type: 'retry' | 'continue' | 'solve'; attempt: number; now: number }
  | { type: 'fail'; attempt: number }
  | { type: 'start'; run: string[]; now: number; practice?: boolean };

export const defaultSeconds = 20;
export const runLength = 15;

export function attemptDuration(levelId: string): number {
  return ((isLevelId(levelId) ? levelMeta[levelId].seconds : undefined) ?? defaultSeconds) * 1000;
}

export const initialState: GameState = { screen: 'home', completed: false, attempt: 0, run: [], index: 0, completedLevels: [], deadline: 0, practice: false };

export function currentLevelId(state: GameState): string {
  return state.run[state.index] ?? levelIds[0];
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'start': {
      const run = action.run.filter(isLevelId);
      if (run.length === 0) return state;
      return { ...state, screen: 'playing', run, index: 0, practice: action.practice ?? false, deadline: action.now + attemptDuration(run[0]), attempt: state.attempt + 1 };
    }
    case 'home':
      return { ...state, screen: 'home' };
    case 'retry':
      return (state.screen === 'playing' || state.screen === 'failed') && state.attempt === action.attempt
        ? { ...state, screen: 'playing', deadline: action.now + attemptDuration(currentLevelId(state)), attempt: state.attempt + 1 }
        : state;
    case 'fail':
      return state.screen === 'playing' && state.attempt === action.attempt ? { ...state, screen: 'failed' } : state;
    case 'solve': {
      if (state.screen !== 'playing' || state.attempt !== action.attempt) return state;
      if (action.now >= state.deadline) return { ...state, screen: 'failed' };
      const id = currentLevelId(state);
      return { ...state, screen: 'solved', completedLevels: [...new Set([...state.completedLevels, id])] };
    }
    case 'continue': {
      if (state.screen !== 'solved' || state.attempt !== action.attempt) return state;
      const index = state.index + 1;
      const next = state.run[index];
      return next
        ? { ...state, screen: 'playing', index, deadline: action.now + attemptDuration(next), attempt: state.attempt + 1 }
        : { ...state, screen: 'finished', completed: state.completed || !state.practice };
    }
  }
}

const storageKey = 'terms-codeytions:progress';

export function loadProgress(): GameState {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(storageKey) ?? 'null');
    if (typeof saved === 'object' && saved !== null && 'version' in saved && saved.version === 2) {
      const completed = 'completed' in saved && saved.completed === true;
      const stored: unknown[] = 'completedLevels' in saved && Array.isArray(saved.completedLevels) ? saved.completedLevels : [];
      const completedLevels = levelIds.filter(id => stored.includes(id));
      return { ...initialState, completed, completedLevels };
    }
  } catch { /* A fresh game remains playable when storage is unavailable. */ }
  return initialState;
}

export function saveProgress(completed: boolean, completedLevels: string[] = []): boolean {
  try {
    localStorage.setItem(storageKey, JSON.stringify({ version: 2, completed, completedLevels }));
    return true;
  } catch {
    return false;
  }
}
