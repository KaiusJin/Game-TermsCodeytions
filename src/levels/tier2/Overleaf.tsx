import { useRef, useState, type PointerEvent } from 'react';
import { m } from 'framer-motion';
import type { LevelProps } from '../../game/types';
import { Agree, Disagree, Stage } from '../shared/controls';
import s from './Overleaf.module.css';

export function Overleaf({ onSolved, onFailed }: LevelProps) {
  const [fold, setFold] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const start = useRef<{ x: number; y: number } | null>(null);

  function move(e: PointerEvent<HTMLButtonElement>) {
    if (!start.current) return;
    const pulled = Math.max(0, Math.max(start.current.x - e.clientX, start.current.y - e.clientY));
    setFold(Math.min(120, 22 + pulled));
    if (pulled > 70) { start.current = null; setFlipped(true); }
  }

  return (
    <Stage className={s.stage}>
      <m.div className={s.card} animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: .6 }}>
        <div className={s.front} aria-hidden={flipped}>
          <strong>Terms &amp; Codeytions</strong>
          <p>1. Be kind to Codey. 2. Respect the geese. 3. Read everything, including what isn’t on this side.</p>
          <Disagree onClick={onFailed} tabIndex={flipped ? -1 : 0} />
          <button type="button" className={s.corner} style={{ width: 22 + fold, height: 22 + fold }} aria-label="Fold the corner (drag, or press Enter)" tabIndex={flipped ? -1 : 0}
            onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); start.current = { x: e.clientX, y: e.clientY }; }}
            onPointerMove={move}
            onPointerUp={() => { start.current = null; if (!flipped) setFold(0); }}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFlipped(true); } }} />
        </div>
        <div className={s.back} aria-hidden={!flipped}>
          <strong>Overleaf</strong>
          <p>…and that’s it. Thanks for reading both sides.</p>
          <Agree onClick={onSolved} tabIndex={flipped ? 0 : -1} />
        </div>
      </m.div>
    </Stage>
  );
}
