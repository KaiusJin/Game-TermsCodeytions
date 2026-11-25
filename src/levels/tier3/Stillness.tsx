import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { LevelProps } from '../../game/types';
import { Agree, Stage } from '../shared/controls';
import s from './Stillness.module.css';

export function Stillness({ onSolved }: LevelProps) {
  const [progress, setProgress] = useState(0);
  const last = useRef(0);
  const ready = progress >= 1;
  useEffect(() => {
    last.current = performance.now();
    let frame = 0;
    let done = false;
    const reset = () => { if (!done) last.current = performance.now(); };
    const tick = (t: number) => {
      const value = Math.min(1, (t - last.current) / 4000);
      setProgress(value);
      if (value >= 1) { done = true; return; }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    const events = ['pointermove', 'pointerdown', 'keydown', 'wheel', 'touchmove'] as const;
    events.forEach(ev => window.addEventListener(ev, reset, { passive: true }));
    return () => { cancelAnimationFrame(frame); events.forEach(ev => window.removeEventListener(ev, reset)); };
  }, []);
  return (
    <Stage className={s.stillStage}>
      <div className={s.meter} style={{ background: `conic-gradient(var(--ink) ${progress * 360}deg, #e2e9f5 0)` }}>
        <span>{ready ? '🐕' : progress > .05 ? '…' : '👀'}</span>
      </div>
      <AnimatePresence>{ready && <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><Agree onClick={onSolved} /></motion.div>}</AnimatePresence>
    </Stage>
  );
}
