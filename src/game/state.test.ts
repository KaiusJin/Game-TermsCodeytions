import { afterEach, describe, expect, it, vi } from 'vitest';
import { levelById, levels } from './levels';
import { pickRun, tierQuota } from './run';
import { attemptDuration, currentLevelId, gameReducer, initialState, loadProgress, runLength, saveProgress } from './state';

afterEach(() => vi.unstubAllGlobals());

const run = levels.slice(0, 3).map(level => level.id);

describe('level pool', () => {
  it('has 50 uniquely named levels, each with hints and an answer', () => {
    expect(levels).toHaveLength(50);
    expect(new Set(levels.map(level => level.id)).size).toBe(50);
    for (const level of levels) {
      expect(level.Component).toBeTypeOf('function');
      expect(level.hints).toHaveLength(2);
      expect(level.answer.length).toBeGreaterThan(0);
    }
  });

  it('has enough levels in every tier to fill a run', () => {
    for (const [tier, quota] of Object.entries(tierQuota)) {
      expect(levels.filter(level => level.tier === Number(tier)).length).toBeGreaterThanOrEqual(quota);
    }
  });
});

describe('random runs', () => {
  it('draws 15 distinct levels ordered by difficulty', () => {
    for (let seed = 0; seed < 20; seed++) {
      const picked = pickRun();
      expect(picked).toHaveLength(runLength);
      expect(new Set(picked).size).toBe(runLength);
      const tiers = picked.map(id => levelById(id)!.tier);
      expect([...tiers].sort()).toEqual(tiers);
    }
  });

  it('varies between runs', () => {
    const draws = new Set(Array.from({ length: 10 }, () => pickRun().join()));
    expect(draws.size).toBeGreaterThan(1);
  });
});

describe('agreement flow', () => {
  it('rejects stale and duplicate completions, then advances once', () => {
    const started = gameReducer(initialState, { now: 0, type: 'start', run });
    const retried = gameReducer(started, { now: 0, type: 'retry', attempt: started.attempt });
    expect(gameReducer(retried, { now: 0, type: 'solve', attempt: started.attempt })).toBe(retried);
    const solved = gameReducer(retried, { now: 0, type: 'solve', attempt: retried.attempt });
    expect(solved.screen).toBe('solved');
    expect(gameReducer(solved, { now: 0, type: 'solve', attempt: retried.attempt })).toBe(solved);
    const next = gameReducer(solved, { now: 0, type: 'continue', attempt: solved.attempt });
    expect(currentLevelId(next)).toBe(run[1]);
    expect(next.screen).toBe('playing');
    expect(gameReducer(next, { now: 0, type: 'continue', attempt: solved.attempt })).toBe(next);
  });

  it('plays the run in order, resets only the current level, and finishes after the last', () => {
    let state = gameReducer(initialState, { now: 0, type: 'start', run });
    for (const id of run) {
      expect(currentLevelId(state)).toBe(id);
      const retried = gameReducer(state, { now: 0, type: 'retry', attempt: state.attempt });
      expect(currentLevelId(retried)).toBe(id);
      state = gameReducer(retried, { now: 0, type: 'solve', attempt: retried.attempt });
      state = gameReducer(state, { now: 0, type: 'continue', attempt: state.attempt });
    }
    expect(state.screen).toBe('finished');
    expect(state.completed).toBe(true);
    expect(state.completedLevels).toEqual(run);
  });

  it('does not mark the game completed after a practice run', () => {
    let state = gameReducer(initialState, { now: 0, type: 'start', run: [run[0]], practice: true });
    state = gameReducer(state, { now: 0, type: 'solve', attempt: state.attempt });
    state = gameReducer(state, { now: 0, type: 'continue', attempt: state.attempt });
    expect(state.screen).toBe('finished');
    expect(state.completed).toBe(false);
  });

  it('uses each level’s own time limit', () => {
    const claw = levelById('claw')!;
    const started = gameReducer(initialState, { type: 'start', run: [claw.id], now: 1000 });
    expect(started.deadline).toBe(1000 + attemptDuration(claw.id));
    expect(attemptDuration(claw.id)).toBe((claw.seconds ?? 20) * 1000);
  });

  it('shows failure before resetting the same agreement and ignores late callbacks', () => {
    const started = gameReducer(initialState, { type: 'start', run, now: 1000 });
    const failed = gameReducer(started, { type: 'fail', attempt: started.attempt });
    expect(failed.screen).toBe('failed');
    expect(gameReducer(failed, { type: 'solve', attempt: started.attempt, now: 2000 })).toBe(failed);
    const retried = gameReducer(failed, { type: 'retry', attempt: failed.attempt, now: 2900 });
    expect(retried.screen).toBe('playing');
    expect(currentLevelId(retried)).toBe(run[0]);
    expect(retried.deadline).toBe(2900 + attemptDuration(run[0]));
    expect(gameReducer(retried, { type: 'fail', attempt: started.attempt })).toBe(retried);
  });

  it('fails an Agree that lands at or after the deadline', () => {
    const started = gameReducer(initialState, { type: 'start', run, now: 0 });
    expect(gameReducer(started, { type: 'solve', attempt: started.attempt, now: started.deadline - 1 }).screen).toBe('solved');
    expect(gameReducer(started, { type: 'solve', attempt: started.attempt, now: started.deadline }).screen).toBe('failed');
  });

  it('ignores unknown level ids and does not skip unsolved agreements', () => {
    expect(gameReducer(initialState, { type: 'start', run: ['nope'], now: 0 })).toBe(initialState);
    const started = gameReducer(initialState, { now: 0, type: 'start', run });
    expect(gameReducer(started, { now: 0, type: 'continue', attempt: started.attempt })).toBe(started);
  });
});

describe('progress storage', () => {
  it.each(['invalid json', '{}', '{"version":1,"completed":true}', '{"version":2,"completed":"true"}'])('safely ignores %s', value => {
    vi.stubGlobal('localStorage', { getItem: () => value });
    expect(loadProgress()).toEqual(initialState);
  });

  it('restores completed progress and known levels', () => {
    vi.stubGlobal('localStorage', { getItem: () => '{"version":2,"completed":true,"completedLevels":["claw","gone"]}' });
    expect(loadProgress()).toEqual({ ...initialState, completed: true, completedLevels: ['claw'] });
  });

  it('remains playable when storage is blocked', () => {
    vi.stubGlobal('localStorage', { getItem: () => { throw new Error('Blocked'); }, setItem: () => { throw new Error('Blocked'); } });
    expect(loadProgress()).toEqual(initialState);
    expect(saveProgress(true)).toBe(false);
  });
});
