import { useRef, useState, type KeyboardEvent } from 'react';
import { m, useMotionValue } from 'framer-motion';
import type { LevelProps } from '../../game/types';
import { Goose } from '../shared/art';
import { Agree, Stage } from '../shared/controls';
import s from './GooseGuard.module.css';

const gooseHome = { left: .3, top: .55 };

export function GooseGuard({ onSolved, onFailed }: LevelProps) {
  const area = useRef<HTMLDivElement>(null);
  const bread = useRef<HTMLDivElement>(null);
  const bx = useMotionValue(0);
  const by = useMotionValue(0);
  const [goose, setGoose] = useState({ x: 0, y: 0 });
  const [honk, setHonk] = useState(false);

  function follow() {
    const a = area.current?.getBoundingClientRect();
    const b = bread.current?.getBoundingClientRect();
    if (!a || !b) return;
    setGoose({ x: b.left - a.left + b.width / 2 - a.width * gooseHome.left, y: b.top - a.top + b.height / 2 - a.height * gooseHome.top - 10 });
  }
  function nudge(e: KeyboardEvent<HTMLDivElement>) {
    const step = 30;
    const moves: Record<string, [number, number]> = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
    const m = moves[e.key];
    if (!m) return;
    e.preventDefault();
    bx.set(bx.get() + m[0]);
    by.set(by.get() + m[1]);
    requestAnimationFrame(follow);
  }

  return (
    <Stage className={s.gooseStage}>
      <div ref={area} className={s.gooseArea}>
        <Agree className={s.gooseAgree} style={{ left: `${gooseHome.left * 100}%`, top: `${gooseHome.top * 100}%` }} onClick={onSolved} />
        <div className={s.gooseAnchor} style={{ left: `${gooseHome.left * 100}%`, top: `${gooseHome.top * 100}%` }}>
          <m.button type="button" className={s.goose} aria-label="Goose (do not touch)" animate={{ x: goose.x, y: goose.y }} transition={{ duration: 1.1, ease: 'easeInOut' }}
            onPointerEnter={() => setHonk(true)} onPointerLeave={() => setHonk(false)} onClick={onFailed}>
            <m.span animate={{ rotate: [0, -4, 4, 0] }} transition={{ repeat: Infinity, duration: .6 }} style={{ display: 'block' }}><Goose size={96} /></m.span>
            {honk && <span className={s.honk}>HONK!</span>}
          </m.button>
        </div>
        <m.div ref={bread} className={s.bread} style={{ x: bx, y: by }} drag dragConstraints={area} dragMomentum={false} onDragEnd={follow}
          tabIndex={0} role="button" aria-label="Bread (drag, or use arrow keys)" onKeyDown={nudge} whileDrag={{ scale: 1.15 }}>
          🍞
        </m.div>
      </div>
    </Stage>
  );
}
