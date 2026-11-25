import { useState } from 'react';
import { m } from 'framer-motion';
import type { LevelProps } from '../../game/types';
import { Agree, Row, Stage } from '../shared/controls';
import s from './MeasuredConsent.module.css';

function Jug({ litres, capacity, label }: { litres: number; capacity: number; label: string }) {
  return (
    <div className={s.jug} style={{ height: 40 + capacity * 24 }} aria-label={`${label}: ${litres} L`}>
      <m.span className={s.water} animate={{ height: `${(litres / capacity) * 100}%` }} transition={{ duration: .35 }} />
      <span className={s.amount}>{litres} L</span>
      <span className={s.cap}>{label}</span>
    </div>
  );
}

export function MeasuredConsent({ onSolved, onFailed }: LevelProps) {
  const [small, setSmall] = useState(0);
  const [big, setBig] = useState(0);
  const [slot, setSlot] = useState(false);

  function pour(fromBig: boolean) {
    if (fromBig) { const moved = Math.min(big, 3 - small); setBig(big - moved); setSmall(small + moved); }
    else { const moved = Math.min(small, 5 - big); setSmall(small - moved); setBig(big + moved); }
  }

  const actions: [string, () => void][] = [
    ['Fill 3 L', () => setSmall(3)], ['Fill 5 L', () => setBig(5)],
    ['Empty 3 L', () => setSmall(0)], ['Empty 5 L', () => setBig(0)],
    ['Pour 3 L → 5 L', () => pour(false)], ['Pour 5 L → 3 L', () => pour(true)],
  ];

  return (
    <Stage>
      <div className={s.bench}>
        <Jug litres={small} capacity={3} label="3 L jug" />
        <Jug litres={big} capacity={5} label="5 L jug" />
        <div className={s.slot} data-full={slot}><span>{slot ? '4 L ✓' : 'Consent slot · 4 L'}</span></div>
      </div>
      <div className={s.actions}>
        {actions.map(([label, run]) => <button key={label} type="button" disabled={slot} onClick={run}>{label}</button>)}
        <button type="button" className={s.toSlot} disabled={slot} onClick={() => (big === 4 ? setSlot(true) : onFailed())}>Pour 5 L into slot</button>
      </div>
      <Row><Agree disabled={!slot} onClick={onSolved} /></Row>
    </Stage>
  );
}
