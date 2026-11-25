import { useRef } from 'react';
import { m } from 'framer-motion';
import type { LevelProps } from '../../game/types';
import { Agree, Stage } from '../shared/controls';
import s from './OutOfTheWay.module.css';

export function OutOfTheWay({ onSolved, onFailed }: LevelProps) {
  const area = useRef<HTMLDivElement>(null);
  const dragged = useRef(false);
  return (
    <Stage className={s.dragStage}>
      <div ref={area} className={s.dragArea}>
        <Agree className={s.under} onClick={onSolved} />
        <m.button
          type="button"
          className={s.cover}
          drag dragConstraints={area} dragElastic={0.08} dragMomentum={false}
          onDragStart={() => { dragged.current = true; }}
          onClick={() => { if (dragged.current) { dragged.current = false; return; } onFailed(); }}
          whileDrag={{ scale: 1.04, rotate: -2 }}
        >
          <span className={s.grip} aria-hidden="true">⋮⋮</span>
          Disagree
          <small>Recommended by our lawyers</small>
        </m.button>
      </div>
    </Stage>
  );
}
