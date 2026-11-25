import { useState } from 'react';
import { m } from 'framer-motion';
import type { LevelProps } from '../../game/types';
import { Stage } from '../shared/controls';
import s from './ReadBetweenLines.module.css';

// Read in order, the first letters spell AGREE.
const clauses: Record<number, string> = {
  1: 'All parties acknowledge that Codey is a very good dog.',
  2: 'Geese are not, and will never be, party to this agreement.',
  3: 'Refunds are unavailable, both financially and emotionally.',
  4: 'Every clause is binding, including this one.',
  5: 'Exceptions may be granted by Codey alone, usually for snacks.',
};

export function ReadBetweenLines({ onSolved }: LevelProps) {
  const [order, setOrder] = useState([3, 1, 5, 2, 4]);
  const sorted = order.every((n, i) => n === i + 1);
  function move(index: number, by: -1 | 1) {
    const next = [...order];
    [next[index], next[index + by]] = [next[index + by], next[index]];
    setOrder(next);
  }
  return (
    <Stage>
      <div className={s.sheet}>
        {sorted
          ? <button type="button" className={s.acrostic} onClick={onSolved} aria-label="AGREE">{order.map(n => <span key={n}>{clauses[n][0]}</span>)}</button>
          : <div className={s.letters} aria-hidden="true">{order.map(n => <span key={n}>{clauses[n][0]}</span>)}</div>}
        <ol className={s.rows}>
          {order.map((n, i) => (
            <m.li key={n} layout className={s.row} data-n={n}>
              <span className={s.num}>§{n}</span>
              <p>{clauses[n].slice(1)}</p>
              <span className={s.moves}>
                <button type="button" aria-label={`Move §${n} up`} disabled={i === 0 || sorted} onClick={() => move(i, -1)}>▲</button>
                <button type="button" aria-label={`Move §${n} down`} disabled={i === order.length - 1 || sorted} onClick={() => move(i, 1)}>▼</button>
              </span>
            </m.li>
          ))}
        </ol>
      </div>
    </Stage>
  );
}
