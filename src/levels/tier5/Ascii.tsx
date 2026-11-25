import { useState } from 'react';
import type { LevelProps } from '../../game/types';
import { Agree, Row, Stage } from '../shared/controls';
import s from './Ascii.module.css';

const bits = [128, 64, 32, 16, 8, 4, 2, 1];

export function Ascii({ onSolved }: LevelProps) {
  const [on, setOn] = useState<number[]>([]);
  const value = on.reduce((a, b) => a + b, 0);
  const char = value >= 32 && value <= 126 ? String.fromCharCode(value) : '·';
  return (
    <Stage className={s.asciiStage}>
      <div className={s.readout}>
        <span>dec <b>{value}</b></span>
        <span>char <b className={s.char}>{char}</b></span>
        <span>need <b>'A'</b></span>
      </div>
      <div className={s.switches}>
        {bits.map(b => (
          <label key={b} className={s.switch}>
            <input type="checkbox" checked={on.includes(b)} onChange={() => setOn(on.includes(b) ? on.filter(x => x !== b) : [...on, b])} />
            <i aria-hidden="true" />
            <span>{b}</span>
            <em>{on.includes(b) ? 1 : 0}</em>
          </label>
        ))}
      </div>
      <Row><Agree disabled={value !== 65} onClick={onSolved} /></Row>
    </Stage>
  );
}
