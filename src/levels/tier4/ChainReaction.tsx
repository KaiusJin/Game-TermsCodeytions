import { useEffect, useRef, useState } from 'react';
import { m } from 'framer-motion';
import type { LevelProps } from '../../game/types';
import { Agree, Stage } from '../shared/controls';
import s from './ChainReaction.module.css';

const count = 8;
const gap = 4;
const stagger = 0.12;

export function ChainReaction({ onSolved }: LevelProps) {
  const slot = useRef<HTMLDivElement>(null);
  const spare = useRef<HTMLDivElement>(null);
  const [placed, setPlaced] = useState(false);
  const [pushed, setPushed] = useState(false);
  const [hit, setHit] = useState(false);
  // Without the missing domino the chain stops at the gap.
  const reach = placed ? count : gap;

  useEffect(() => {
    if (!pushed || !placed) return;
    const timer = window.setTimeout(() => setHit(true), (count * stagger + 0.3) * 1000);
    return () => window.clearTimeout(timer);
  }, [pushed, placed]);

  function dropped() {
    const a = slot.current?.getBoundingClientRect();
    const b = spare.current?.getBoundingClientRect();
    if (!a || !b) return;
    if (Math.abs(a.left + a.width / 2 - (b.left + b.width / 2)) < 40 && Math.abs(a.top + a.height / 2 - (b.top + b.height / 2)) < 60) setPlaced(true);
  }

  return (
    <Stage className={s.stage}>
      <div className={s.track}>
        {Array.from({ length: count }, (_, i) => {
          if (i === gap && !placed) return <div key={i} ref={slot} className={s.slot} aria-label="Gap" />;
          return <m.span key={i} className={s.domino} animate={{ rotate: pushed && i < reach ? 72 : 0 }} transition={{ delay: pushed ? i * stagger : 0, duration: .18 }} />;
        })}
        <div className={s.target}>
          <Agree disabled={!hit} onClick={onSolved}>{hit ? 'Agree' : '🔒'}</Agree>
        </div>
      </div>
      <div className={s.controls}>
        {!placed && (
          <m.div ref={spare} className={s.spare} drag dragMomentum={false} onDragEnd={dropped} role="button" tabIndex={0}
            aria-label="Spare domino (drag into the gap, or press Enter)" onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPlaced(true); } }} />
        )}
        {pushed && !placed
          ? <button type="button" className="button secondary" onClick={() => setPushed(false)}>Stand them back up</button>
          : <button type="button" className="button secondary" disabled={pushed} onClick={() => setPushed(true)}>Push</button>}
      </div>
    </Stage>
  );
}
