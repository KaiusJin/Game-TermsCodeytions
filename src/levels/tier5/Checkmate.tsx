import { useState } from 'react';
import { m } from 'framer-motion';
import type { LevelProps } from '../../game/types';
import { Agree, Row, Stage } from '../shared/controls';
import s from './Checkmate.module.css';

const size = 5;
const files = 'abcde';
const start = { r: 4, c: 0 };
const goal = { r: 0, c: 4 };
const pawns = ['2,1', '1,2', '3,3'];
const maxMoves = 4;
const isKnightMove = (a: { r: number; c: number }, r: number, c: number) => {
  const dr = Math.abs(a.r - r);
  const dc = Math.abs(a.c - c);
  return (dr === 1 && dc === 2) || (dr === 2 && dc === 1);
};

export function Checkmate({ onSolved, onFailed }: LevelProps) {
  const [pos, setPos] = useState(start);
  const [moves, setMoves] = useState(0);
  const arrived = pos.r === goal.r && pos.c === goal.c;

  function go(r: number, c: number) {
    if (arrived || !isKnightMove(pos, r, c)) return;
    if (pawns.includes(`${r},${c}`)) { onFailed(); return; }
    const used = moves + 1;
    setPos({ r, c });
    setMoves(used);
    if (!(r === goal.r && c === goal.c) && used >= maxMoves) onFailed();
  }

  return (
    <Stage className={s.stage}>
      <div className={s.board}>
        {Array.from({ length: size * size }, (_, i) => {
          const r = Math.floor(i / size);
          const c = i % size;
          const pawn = pawns.includes(`${r},${c}`);
          const isGoal = r === goal.r && c === goal.c;
          return (
            <button key={i} type="button" className={s.square} data-dark={(r + c) % 2 === 1} data-goal={isGoal} data-reachable={!arrived && isKnightMove(pos, r, c)}
              aria-label={`${files[c]}${r + 1}${pawn ? ' (Disagree)' : ''}${isGoal ? ' (signature)' : ''}`} onClick={() => go(r, c)}>
              {pawn && <span className={s.pawn}>✗</span>}
              {isGoal && !arrived && <span className={s.sign}>✍</span>}
            </button>
          );
        })}
        <m.span className={s.knight} animate={{ left: `${(pos.c / size) * 100}%`, top: `${(pos.r / size) * 100}%` }} transition={{ type: 'spring', stiffness: 240, damping: 22 }}>♞</m.span>
      </div>
      <p className={s.moves}>Moves: {moves} / {maxMoves}</p>
      <Row><Agree disabled={!arrived} onClick={onSolved} /></Row>
    </Stage>
  );
}
