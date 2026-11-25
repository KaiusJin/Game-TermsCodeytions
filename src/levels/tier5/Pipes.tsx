import { useState } from 'react';
import { m } from 'framer-motion';
import type { LevelProps } from '../../game/types';
import { Agree, Stage } from '../shared/controls';
import s from './Pipes.module.css';

const N = 1, E = 2, S = 4, W = 8;

const rotateMask = (m: number, times: number) => { let r = m; for (let i = 0; i < ((times % 4) + 4) % 4; i++) r = ((r << 1) | (r >> 3)) & 15; return r; };

// Solved layout (3 rows × 4 columns) and how many quarter-turns each tile starts away from it.
const solvedPipes = [[E | W, W | S, N | E, N | S], [S | E, N | S, E | W, N | W], [N | S, N | E, E | W, E | W]];

const pipeTurns = [[1, 2, 3, 1], [2, 1, 1, 0], [3, 1, 1, 1]];

const rows = 3, cols = 4;

function powered(turns: number[][]): { cells: Set<string>; done: boolean } {
  const mask = (r: number, c: number) => rotateMask(solvedPipes[r][c], turns[r][c]);
  const cells = new Set<string>();
  if (!(mask(0, 0) & W)) return { cells, done: false };
  const queue: [number, number][] = [[0, 0]];
  cells.add('0,0');
  const dirs: [number, number, number, number][] = [[-1, 0, N, S], [0, 1, E, W], [1, 0, S, N], [0, -1, W, E]];
  while (queue.length) {
    const [r, c] = queue.shift()!;
    for (const [dr, dc, out, inn] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols || cells.has(`${nr},${nc}`)) continue;
      if ((mask(r, c) & out) && (mask(nr, nc) & inn)) { cells.add(`${nr},${nc}`); queue.push([nr, nc]); }
    }
  }
  return { cells, done: cells.has(`${rows - 1},${cols - 1}`) && Boolean(mask(rows - 1, cols - 1) & E) };
}

function PipeTile({ base, on }: { base: number; on: boolean }) {
  const stroke = on ? '#8db8ff' : '#8496b8';
  const ends: Record<number, string> = { [N]: 'M50 50 V0', [E]: 'M50 50 H100', [S]: 'M50 50 V100', [W]: 'M50 50 H0' };
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      {[N, E, S, W].filter(b => base & b).map(b => <path key={b} d={ends[b]} stroke="#000" strokeWidth="30" strokeLinecap="round" />)}
      {[N, E, S, W].filter(b => base & b).map(b => <path key={`i${b}`} d={ends[b]} stroke={stroke} strokeWidth="18" strokeLinecap="round" />)}
      <circle cx="50" cy="50" r="12" fill={stroke} stroke="#000" strokeWidth="5" />
    </svg>
  );
}

export function Pipes({ onSolved }: LevelProps) {
  const [turns, setTurns] = useState(pipeTurns);
  const { cells, done } = powered(turns);
  return (
    <Stage className={s.pipeStage}>
      <div className={s.pipeWrap}>
        <span className={s.source} aria-hidden="true">⚡</span>
        <div className={s.pipeGrid}>
          {solvedPipes.map((row, r) => row.map((base, c) => (
            <button key={`${r},${c}`} type="button" className={s.pipe} data-on={cells.has(`${r},${c}`)} aria-label={`Rotate pipe row ${r + 1} column ${c + 1}`}
              onClick={() => setTurns(turns.map((tr, i) => tr.map((v, j) => (i === r && j === c ? v + 1 : v))))}>
              <m.span className={s.pipeSpin} initial={false} animate={{ rotate: turns[r][c] * 90 }} transition={{ type: 'spring', stiffness: 400, damping: 26 }}>
                <PipeTile base={base} on={cells.has(`${r},${c}`)} />
              </m.span>
            </button>
          )))}
        </div>
        <div className={s.sink}><Agree disabled={!done} onClick={onSolved} className={done ? s.lit : ''} /></div>
      </div>
    </Stage>
  );
}
