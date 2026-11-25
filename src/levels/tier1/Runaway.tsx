import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { m } from 'framer-motion';
import type { LevelProps } from '../../game/types';
import { Agree, Stage } from '../shared/controls';
import s from './Runaway.module.css';

const runner = { w: 120, h: 48 };

export function Runaway({ onSolved }: LevelProps) {
  const stage = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const rect = stage.current?.getBoundingClientRect();
    if (rect) setPos({ x: rect.width / 2 - runner.w / 2, y: rect.height / 2 - runner.h / 2 });
  }, []);

  function flee(event: PointerEvent<HTMLDivElement>) {
    const rect = stage.current?.getBoundingClientRect();
    if (!rect || !pos) return;
    const px = event.clientX - rect.left;
    const py = event.clientY - rect.top;
    const cx = pos.x + runner.w / 2;
    const cy = pos.y + runner.h / 2;
    const dx = cx - px;
    const dy = cy - py;
    const distance = Math.hypot(dx, dy);
    if (distance > 100) return;
    const push = 130 - distance;
    const nx = distance === 0 ? 1 : dx / distance;
    const ny = distance === 0 ? 0 : dy / distance;
    const margin = 8;
    // Clamping to the box is what makes the puzzle solvable: in a corner it has nowhere to go.
    setPos({
      x: Math.min(rect.width - runner.w - margin, Math.max(margin, pos.x + nx * push)),
      y: Math.min(rect.height - runner.h - margin, Math.max(margin, pos.y + ny * push)),
    });
  }

  return (
    <Stage className={s.runStage} onPointerMove={flee}>
      <div ref={stage} className={s.runArea}>
        {pos && (
          <m.div className={s.runner} initial={false} animate={{ x: pos.x, y: pos.y }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}>
            <Agree onClick={onSolved} style={{ width: runner.w, height: runner.h }} />
          </m.div>
        )}
      </div>
    </Stage>
  );
}
