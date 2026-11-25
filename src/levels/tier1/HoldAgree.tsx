import { useEffect, useRef, useState } from 'react';
import type { LevelProps } from '../../game/types';
import { Stage } from '../shared/controls';
import s from './HoldAgree.module.css';

export function HoldAgree({ onSolved }: LevelProps) {
  const [progress, setProgress] = useState(0);
  const startedAt = useRef<number | null>(null);
  const frame = useRef(0);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  function start() {
    if (startedAt.current !== null) return;
    startedAt.current = performance.now();
    const tick = (time: number) => {
      if (startedAt.current === null) return;
      const value = Math.min(1, (time - startedAt.current) / 1500);
      setProgress(value);
      if (value >= 1) { startedAt.current = null; onSolved(); return; }
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  }
  function stop() {
    startedAt.current = null;
    cancelAnimationFrame(frame.current);
    setProgress(0);
  }

  return (
    <Stage className={s.centerStage}>
      <button
        type="button"
        className={`button primary ${s.hold}`}
        onPointerDown={start} onPointerUp={stop} onPointerLeave={stop} onPointerCancel={stop}
        onKeyDown={e => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); start(); } }}
        onKeyUp={e => { if (e.key === ' ' || e.key === 'Enter') stop(); }}
        onContextMenu={e => e.preventDefault()}
      >
        <span className={s.holdFill} style={{ transform: `scaleX(${progress})` }} />
        <span className={s.holdLabel}>{progress > 0 ? 'Keep holding…' : 'Agree'}</span>
      </button>
    </Stage>
  );
}
