import { useRef, useState, type PointerEvent } from 'react';
import type { LevelProps } from '../../game/types';
import { Agree, Stage } from '../shared/controls';
import s from './Invisible.module.css';

export function Invisible({ onSolved }: LevelProps) {
  const button = useRef<HTMLButtonElement>(null);
  const [opacity, setOpacity] = useState(0);

  function track(event: PointerEvent<HTMLDivElement>) {
    const rect = button.current?.getBoundingClientRect();
    if (!rect) return;
    const d = Math.hypot(event.clientX - (rect.left + rect.width / 2), event.clientY - (rect.top + rect.height / 2));
    setOpacity(Math.max(0, Math.min(1, 1 - (d - 30) / 140)));
  }

  return (
    <Stage className={s.invisible} onPointerMove={track} onPointerLeave={() => setOpacity(0)}>
      <span className={s.emptyNote}>(intentionally left blank)</span>
      <Agree ref={button} className={s.ghost} style={{ opacity }} onFocus={() => setOpacity(1)} onBlur={() => setOpacity(0)} onClick={onSolved} />
    </Stage>
  );
}
