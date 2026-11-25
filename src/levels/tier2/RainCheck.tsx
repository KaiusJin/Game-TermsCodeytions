import { useEffect, useRef, useState } from 'react';
import { m, useMotionValue } from 'framer-motion';
import type { LevelProps } from '../../game/types';
import { Agree, Stage } from '../shared/controls';
import s from './RainCheck.module.css';

export function RainCheck({ onSolved }: LevelProps) {
  const paper = useRef<HTMLDivElement>(null);
  const umbrella = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [covered, setCovered] = useState(false);
  const [dry, setDry] = useState(false);

  useEffect(() => {
    if (!covered) return;
    const timer = window.setTimeout(() => setDry(true), 1200);
    return () => window.clearTimeout(timer);
  }, [covered]);

  function check() {
    const p = paper.current?.getBoundingClientRect();
    const u = umbrella.current?.getBoundingClientRect();
    if (!p || !u) return;
    const cx = u.left + u.width / 2;
    const over = cx > p.left && cx < p.right && u.bottom > p.top - 40 && u.top < p.top + p.height / 2;
    setCovered(over);
    if (!over) setDry(false);
  }
  function openOverPaper() {
    const p = paper.current?.getBoundingClientRect();
    const u = umbrella.current?.getBoundingClientRect();
    if (!p || !u) return;
    x.set(x.get() + (p.left + p.width / 2) - (u.left + u.width / 2));
    y.set(y.get() + (p.top - 20) - (u.top + u.height / 2));
    setCovered(true);
  }

  return (
    <Stage className={s.stage}>
      <div className={s.rain} data-covered={covered} aria-hidden="true">{Array.from({ length: 28 }, (_, i) => <i key={i} style={{ left: `${(i * 37) % 100}%`, animationDelay: `${(i % 7) * 0.13}s` }} />)}</div>
      <div ref={paper} className={s.paper} data-wet={!dry}>
        <strong>Terms &amp; Codeytions</strong>
        <p>Printed in invisible ink. Keep dry.</p>
        <Agree className={s.ink} disabled={!dry} onClick={onSolved} />
      </div>
      <m.div ref={umbrella} className={s.umbrella} style={{ x, y }} drag dragMomentum={false} onDragEnd={check} whileDrag={{ scale: 1.08 }}
        role="button" tabIndex={0} aria-label="Umbrella (drag over the document, or press Enter)"
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openOverPaper(); } }}>☂️</m.div>
    </Stage>
  );
}
