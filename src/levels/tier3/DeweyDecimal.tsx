import { useState } from 'react';
import { m } from 'framer-motion';
import type { LevelProps } from '../../game/types';
import { Agree, Stage } from '../shared/controls';
import s from './DeweyDecimal.module.css';

// Library of Congress order: QA67 before QA76, and cutters compare as decimals (A12 < A3 < A367 < A37 < A38).
const books = [
  { call: 'QA67.A37', title: 'Geese of Ontario', color: '#7c9a5e' },
  { call: 'QA76.A12', title: 'Intro to Naps', color: '#c58b4a' },
  { call: 'QA76.A3', title: 'Recursion', color: '#8064a2' },
  // Never judge a book by its title: the spine that says “Agreements” is the wrong call number.
  { call: 'QA76.A367', title: 'Agreements', color: '#b55252' },
  { call: 'QA76.A37', title: 'Fine Print', color: '#2867d8' },
  { call: 'QA76.A38', title: 'Agreeable Dogs', color: '#4a8a8a' },
  { call: 'QA76.A73', title: 'Midterm Survival', color: '#a5763c' },
  { call: 'QA76.B05', title: 'Big Data, Bigger Geese', color: '#5d6b8a' },
];

export function DeweyDecimal({ onSolved, onFailed }: LevelProps) {
  const [pulled, setPulled] = useState(false);
  return (
    <Stage className={s.stage}>
      <div className={s.shelf}>
        {books.map((b, i) => (
          <m.button key={b.call} type="button" className={s.spine} aria-label={b.call} style={{ background: b.color, height: 150 + ((i * 17) % 40) }}
            animate={pulled && b.call === 'QA76.A37' ? { y: -40, opacity: 0 } : { y: 0 }}
            onClick={() => (b.call === 'QA76.A37' ? setPulled(true) : onFailed())}>
            <span className={s.spineTitle}>{b.title}</span>
            <span className={s.call}>{b.call.replace('.', '\n.')}</span>
          </m.button>
        ))}
      </div>
      {pulled && (
        <m.div className={s.cover} initial={{ scale: .6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <small>QA76.A37</small>
          <strong>Terms &amp; Codeytions</strong>
          <Agree onClick={onSolved} />
        </m.div>
      )}
    </Stage>
  );
}
