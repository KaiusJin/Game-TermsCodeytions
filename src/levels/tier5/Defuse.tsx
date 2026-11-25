import { useState } from 'react';
import type { LevelProps } from '../../game/types';
import { Agree, Row, Stage } from '../shared/controls';
import s from './Defuse.module.css';

const wires = [{ id: 'red', color: '#d93a2f' }, { id: 'gold', color: '#e6b422' }, { id: 'blue', color: '#3d7be0' }, { id: 'black', color: '#1d2f52' }] as const;

export function Defuse({ onSolved, onFailed }: LevelProps) {
  const [cut, setCut] = useState<string[]>([]);
  const disarmed = cut.includes('gold') && cut.includes('black');
  function snip(id: string) {
    if (cut.includes(id)) return;
    if (id === 'red' || (id === 'black' && !cut.includes('gold'))) { onFailed(); return; }
    setCut([...cut, id]);
  }
  return (
    <Stage className={s.bombStage}>
      <div className={s.bomb}>
        <div className={s.bombTop}>
          <div className={s.lcd} data-safe={disarmed}>{disarmed ? 'SAFE' : 'ARMED'}</div>
          <span className={s.led} data-safe={disarmed} />
        </div>
        <div className={s.wires}>
          {wires.map((w, i) => (
            <button key={w.id} type="button" className={s.wire} aria-label={`Cut ${w.id} wire`} disabled={cut.includes(w.id) || disarmed} onClick={() => snip(w.id)}>
              <svg viewBox="0 0 300 30" preserveAspectRatio="none" aria-hidden="true">
                {cut.includes(w.id)
                  ? <><path d={`M0 15 Q60 ${i % 2 ? 2 : 28} 130 18`} stroke={w.color} strokeWidth="9" fill="none" strokeLinecap="round" /><path d={`M170 12 Q240 ${i % 2 ? 28 : 2} 300 15`} stroke={w.color} strokeWidth="9" fill="none" strokeLinecap="round" /></>
                  : <path d={`M0 15 Q75 ${i % 2 ? 2 : 28} 150 15 T300 15`} stroke={w.color} strokeWidth="9" fill="none" strokeLinecap="round" />}
              </svg>
              <span className={s.snip}>✂</span>
            </button>
          ))}
        </div>
      </div>
      <Row><Agree disabled={!disarmed} onClick={onSolved} /></Row>
    </Stage>
  );
}
