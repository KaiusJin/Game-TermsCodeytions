import { useState } from 'react';
import { m } from 'framer-motion';
import type { LevelProps } from '../../game/types';
import { Agree, Stage } from '../shared/controls';
import s from './TowerOfCodey.module.css';

const letters: Record<number, string> = { 1: 'A', 2: 'G', 3: 'R' };

export function TowerOfCodey({ onSolved }: LevelProps) {
  // Each peg lists disc sizes bottom-to-top.
  const [pegs, setPegs] = useState<number[][]>([[3, 2, 1], [], []]);
  const [held, setHeld] = useState<number | null>(null);
  const [shake, setShake] = useState(0);
  const done = pegs[2].length === 3;

  function choose(i: number) {
    if (done) return;
    if (held === null) { if (pegs[i].length) setHeld(i); return; }
    if (held === i) { setHeld(null); return; }
    const disc = pegs[held].at(-1)!;
    const top = pegs[i].at(-1);
    if (top !== undefined && top < disc) { setShake(shake + 1); setHeld(null); return; }
    setPegs(pegs.map((p, j) => (j === held ? p.slice(0, -1) : j === i ? [...p, disc] : p)));
    setHeld(null);
  }

  return (
    <Stage>
      <m.div className={s.board} animate={{ x: shake % 2 ? [0, -6, 6, 0] : [0, 6, -6, 0] }} transition={{ duration: .25 }}>
        {pegs.map((peg, i) => (
          <button key={i} type="button" className={s.peg} aria-label={`Peg ${i + 1}`} aria-pressed={held === i} onClick={() => choose(i)}>
            <span className={s.pole} />
            <span className={s.stack}>
              {peg.map((disc, j) => (
                <m.span key={disc} layout className={s.disc} data-lifted={held === i && j === peg.length - 1} style={{ width: 40 + disc * 26 }}>{letters[disc]}</m.span>
              ))}
            </span>
          </button>
        ))}
      </m.div>
      <div className={s.result}>{done ? <Agree onClick={onSolved}>AGR + EE = Agree</Agree> : <span>Move the tower to peg 3</span>}</div>
    </Stage>
  );
}
