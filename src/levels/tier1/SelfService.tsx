import { useRef, useState } from 'react';
import { m } from 'framer-motion';
import type { LevelProps } from '../../game/types';
import { Stage } from '../shared/controls';
import s from './SelfService.module.css';

export function SelfService({ onSolved }: LevelProps) {
  const zone = useRef<HTMLDivElement>(null);
  const stamp = useRef<HTMLButtonElement>(null);
  const [stamped, setStamped] = useState(false);

  function stampIt() {
    setStamped(true);
    onSolved();
  }
  function dropped() {
    const z = zone.current?.getBoundingClientRect();
    const b = stamp.current?.getBoundingClientRect();
    if (!z || !b) return;
    const cx = b.left + b.width / 2;
    const cy = b.top + b.height / 2;
    if (cx > z.left && cx < z.right && cy > z.top - 30 && cy < z.bottom + 30) stampIt();
  }

  return (
    <Stage className={s.desk}>
      <div className={s.paper}>
        <p className={s.line}>Terms &amp; Codeytions — official copy</p>
        <div className={s.fake} aria-hidden="true"><i /><i /><i /></div>
        <div ref={zone} className={s.zone} data-stamped={stamped}>
          {stamped ? <span className={s.impression}>AGREED</span> : <span className={s.hint}>stamp here</span>}
        </div>
      </div>
      {!stamped && (
        <m.button ref={stamp} type="button" className={s.stamp} aria-label="Agree stamp (drag onto the signature line, or press Enter)"
          drag dragMomentum={false} whileDrag={{ scale: 1.08, rotate: -6 }} onDragEnd={dropped}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); stampIt(); } }}>
          <span className={s.handle} />
          <span className={s.face}>AGREE</span>
        </m.button>
      )}
    </Stage>
  );
}
