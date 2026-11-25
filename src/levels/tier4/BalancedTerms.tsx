import { useState } from 'react';
import { m } from 'framer-motion';
import type { LevelProps } from '../../game/types';
import { Agree, Row, Stage } from '../shared/controls';
import s from './BalancedTerms.module.css';

const target = 7;
const weights = [1, 2, 3, 4, 6];

export function BalancedTerms({ onSolved }: LevelProps) {
  const [onPan, setOnPan] = useState<number[]>([]);
  const total = onPan.reduce((a, b) => a + b, 0);
  const tilt = Math.max(-18, Math.min(18, (total - target) * 4));
  const balanced = total === target;
  const toggle = (w: number) => setOnPan(onPan.includes(w) ? onPan.filter(x => x !== w) : [...onPan, w]);
  return (
    <Stage>
      <div className={s.scale}>
        <m.div className={s.beam} animate={{ rotate: tilt }} transition={{ type: 'spring', stiffness: 120, damping: 12 }}>
          {/* Pans counter-rotate so they keep hanging straight down from the beam. */}
          <m.div className={`${s.pan} ${s.left}`} animate={{ rotate: -tilt }} transition={{ type: 'spring', stiffness: 120, damping: 12 }}>
            <span className={s.load}><span className={s.clause}>Clause 7<br />7 kg</span></span><span className={s.dish} />
          </m.div>
          <m.div className={`${s.pan} ${s.right}`} animate={{ rotate: -tilt }} transition={{ type: 'spring', stiffness: 120, damping: 12 }}>
            <span className={s.load}>{onPan.map(w => <span key={w} className={s.weight}>{w}</span>)}</span><span className={s.dish} />
          </m.div>
        </m.div>
        <span className={s.post} />
        <span className={s.level} data-ok={balanced}>{balanced ? 'Balanced' : `${total} kg / ${target} kg`}</span>
      </div>
      <div className={s.tray}>
        {weights.map(w => <button key={w} type="button" className={s.weightButton} aria-pressed={onPan.includes(w)} onClick={() => toggle(w)}>{w} kg</button>)}
      </div>
      <Row><Agree disabled={!balanced} onClick={onSolved} /></Row>
    </Stage>
  );
}
