import { useState } from 'react';
import type { LevelProps } from '../../game/types';
import { Agree, Row, Stage } from '../shared/controls';
import s from './EndlessScroll.module.css';

const legalese = [
  'The user agrees that scrolling is a form of exercise.',
  'Codey reserves the right to nap during business hours.',
  'All geese are deemed to be in charge of Ring Road.',
  'This clause intentionally references the previous clause.',
  'The user waives the right to complain about midterm season.',
  'Coffee from the C&D counts as a legal currency.',
  'Any resemblance to real terms of service is purely coincidental.',
  'The user shall not compile code during lectures. (Codey does.)',
  'Clauses may be generated faster than they can be read.',
];

export function EndlessScroll({ onSolved }: LevelProps) {
  const [count, setCount] = useState(14);
  const [skipped, setSkipped] = useState(false);
  if (skipped) {
    return (
      <Stage className={s.signature}>
        <span className="eyebrow">Signature block</span>
        <p>You skipped 1,048,576 clauses. Codey respects that.</p>
        <Row><Agree onClick={onSolved} /></Row>
      </Stage>
    );
  }
  return (
    <Stage className={s.scrollStage}>
      <div className={s.scroller} onScroll={e => {
        const el = e.currentTarget;
        if (el.scrollTop + el.clientHeight > el.scrollHeight - 120 && count < 600) setCount(count + 10);
      }}>
        <p><b>§1.</b> These terms are long. (Accessibility: <button type="button" className={s.skip} onClick={() => setSkipped(true)}>skip to signature</button>.)</p>
        {Array.from({ length: count }, (_, i) => <p key={i}><b>§{i + 2}.</b> {legalese[(i * 4) % legalese.length]}</p>)}
        <p className={s.loading}>Loading more terms…</p>
      </div>
    </Stage>
  );
}
