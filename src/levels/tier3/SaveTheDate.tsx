import { useState } from 'react';
import type { LevelProps } from '../../game/types';
import { Agree, Row, Stage } from '../shared/controls';
import s from './SaveTheDate.module.css';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const year = 2026;

export function SaveTheDate({ onSolved, onFailed }: LevelProps) {
  const [month, setMonth] = useState(10);
  const [picked, setPicked] = useState<{ month: number; day: number } | null>(null);
  const offset = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  return (
    <Stage className={s.stage}>
      <div className={s.calendar}>
        <div className={s.head}>
          <button type="button" aria-label="Previous month" disabled={month === 0} onClick={() => setMonth(month - 1)}>‹</button>
          <strong aria-live="polite">{months[month]} {year}</strong>
          <button type="button" aria-label="Next month" disabled={month === 11} onClick={() => setMonth(month + 1)}>›</button>
        </div>
        <div className={s.grid}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <span key={i} className={s.dow}>{d}</span>)}
          {Array.from({ length: offset }, (_, i) => <span key={`x${i}`} />)}
          {Array.from({ length: days }, (_, i) => {
            const day = i + 1;
            const on = picked?.month === month && picked.day === day;
            return <button key={day} type="button" className={s.day} aria-pressed={on} onClick={() => setPicked({ month, day })}>{day}</button>;
          })}
        </div>
      </div>
      <Row>
        <Agree disabled={!picked} onClick={() => (picked?.month === 2 && picked.day === 14 ? onSolved() : onFailed())}>
          {picked ? `Agree on ${months[picked.month].slice(0, 3)} ${picked.day}` : 'Pick a date'}
        </Agree>
      </Row>
    </Stage>
  );
}
