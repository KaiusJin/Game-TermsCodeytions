import { useRef, useState } from 'react';
import { m } from 'framer-motion';
import type { LevelProps } from '../../game/types';
import { Agree, Disagree, Stage } from '../shared/controls';
import s from './PullRequest.module.css';

export function PullRequest({ onSolved, onFailed }: LevelProps) {
  const cage = useRef<HTMLDivElement>(null);
  const magnet = useRef<HTMLDivElement>(null);
  const [pulled, setPulled] = useState(false);
  function check() {
    const c = cage.current?.getBoundingClientRect();
    const g = magnet.current?.getBoundingClientRect();
    if (!c || !g) return;
    const near = g.left < c.right + 90 && g.right > c.left && g.bottom > c.top && g.top < c.bottom;
    if (near) setPulled(true);
  }
  return (
    <Stage className={s.stage}>
      <div ref={cage} className={s.cage}>
        <m.div className={s.metal} style={{ zIndex: pulled ? 3 : 1 }} animate={pulled ? { x: 200 } : { x: 0 }} transition={{ type: 'spring', stiffness: 160, damping: 14 }}>
          <Agree className={s.metalButton} onClick={onSolved} tabIndex={pulled ? 0 : -1} style={{ pointerEvents: pulled ? 'auto' : 'none' }} />
        </m.div>
        <Disagree className={s.wood} onClick={onFailed} tabIndex={-1} />
        <div className={s.bars} aria-hidden="true" />
      </div>
      {!pulled && (
        <m.div ref={magnet} className={s.magnet} drag dragMomentum={false} onDragEnd={check} whileDrag={{ scale: 1.1 }}
          role="button" tabIndex={0} aria-label="Magnet (drag next to the cage, or press Enter)"
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPulled(true); } }}>🧲</m.div>
      )}
    </Stage>
  );
}
