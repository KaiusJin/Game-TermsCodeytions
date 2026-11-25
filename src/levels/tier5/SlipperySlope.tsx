import { useEffect, useRef, useState } from 'react';
import { m } from 'framer-motion';
import type { LevelProps } from '../../game/types';
import { Agree, Row, Stage } from '../shared/controls';
import s from './SlipperySlope.module.css';

// '#' rocks stop you; the goal does not. Fastest route: → ↑ → ↑ ←.
const grid = ['...#..', '#.....', '.#..#.', '...#..', '#.....', '....#.'];
const start = { r: 5, c: 0 };
const goal = { r: 0, c: 4 };
const size = grid.length;
type Dir = 'up' | 'down' | 'left' | 'right';
const deltas: Record<Dir, [number, number]> = { up: [-1, 0], down: [1, 0], left: [0, -1], right: [0, 1] };

function slide(from: { r: number; c: number }, dir: Dir) {
  let { r, c } = from;
  const [dr, dc] = deltas[dir];
  while (r + dr >= 0 && r + dr < size && c + dc >= 0 && c + dc < size && grid[r + dr][c + dc] !== '#') { r += dr; c += dc; }
  return { r, c };
}

export function SlipperySlope({ onSolved }: LevelProps) {
  const [pos, setPos] = useState(start);
  const posRef = useRef(start);
  const arrived = pos.r === goal.r && pos.c === goal.c;
  const move = (dir: Dir) => {
    if (posRef.current.r === goal.r && posRef.current.c === goal.c) return;
    posRef.current = slide(posRef.current, dir);
    setPos(posRef.current);
  };

  useEffect(() => {
    const keys: Record<string, Dir> = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right' };
    function onKey(e: KeyboardEvent) {
      const dir = keys[e.key];
      if (!dir) return;
      e.preventDefault();
      if (posRef.current.r === goal.r && posRef.current.c === goal.c) return;
      posRef.current = slide(posRef.current, dir);
      setPos(posRef.current);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <Stage className={s.stage}>
      <div className={s.rink}>
        {grid.flatMap((row, r) => [...row].map((cell, c) => (
          <span key={`${r}${c}`} className={s.cell} data-rock={cell === '#'} data-goal={r === goal.r && c === goal.c} />
        )))}
        <m.span className={s.token} animate={{ left: `${(pos.c / size) * 100}%`, top: `${(pos.r / size) * 100}%` }} transition={{ type: 'spring', stiffness: 260, damping: 26 }} data-arrived={arrived}>A</m.span>
      </div>
      <div className={s.pad}>
        <button type="button" aria-label="Slide up" onClick={() => move('up')}>↑</button>
        <button type="button" aria-label="Slide left" onClick={() => move('left')}>←</button>
        <button type="button" aria-label="Slide right" onClick={() => move('right')}>→</button>
        <button type="button" aria-label="Slide down" onClick={() => move('down')}>↓</button>
        <button type="button" className={s.reset} onClick={() => { posRef.current = start; setPos(start); }}>Reset</button>
      </div>
      <Row><Agree disabled={!arrived} onClick={onSolved} /></Row>
    </Stage>
  );
}
