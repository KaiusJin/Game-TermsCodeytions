import { useState } from 'react';
import type { LevelProps } from '../../game/types';
import { Agree, Row, Stage } from '../shared/controls';
import s from './PatternMatching.module.css';

const pattern = /^Ag+re{2}$/;
const labels = ['Agree', 'Agre', 'Aggree', 'Agreee', 'agree', 'Agggree', 'Aggre', 'AGREE', 'Agree!', 'Ageree', 'Agrree', 'Agee'];

export function PatternMatching({ onSolved, onFailed }: LevelProps) {
  const [picked, setPicked] = useState<string[]>([]);
  const [confirmed, setConfirmed] = useState(false);
  function confirm() {
    const wanted = labels.filter(l => pattern.test(l));
    if (wanted.length === picked.length && wanted.every(l => picked.includes(l))) setConfirmed(true);
    else onFailed();
  }
  return (
    <Stage>
      <code className={s.regex}>/^Ag+re{'{2}'}$/</code>
      <div className={s.grid}>
        {labels.map(l => (
          <button key={l} type="button" className={s.cell} aria-pressed={picked.includes(l)} disabled={confirmed} onClick={() => setPicked(picked.includes(l) ? picked.filter(p => p !== l) : [...picked, l])}>{l}</button>
        ))}
      </div>
      <Row>
        {!confirmed && <button type="button" className="button secondary" onClick={confirm}>Confirm</button>}
        <Agree disabled={!confirmed} onClick={onSolved} />
      </Row>
    </Stage>
  );
}
