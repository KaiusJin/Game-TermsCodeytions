import { useRef, useState, type FocusEvent, type PointerEvent } from 'react';
import type { LevelProps } from '../../game/types';
import { Agree, Disagree, Stage } from '../shared/controls';
import s from './LightsOut.module.css';

const darkButtons = [
  { left: 10, top: 12, agree: false }, { left: 68, top: 10, agree: false }, { left: 40, top: 44, agree: false },
  { left: 72, top: 70, agree: false }, { left: 8, top: 72, agree: true },
];

export function LightsOut({ onSolved, onFailed }: LevelProps) {
  const [light, setLight] = useState({ x: -300, y: -300 });
  const area = useRef<HTMLDivElement>(null);
  function move(e: PointerEvent<HTMLDivElement>) {
    const rect = area.current?.getBoundingClientRect();
    if (rect) setLight({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }
  return (
    <Stage className={s.darkStage}>
      <div ref={area} className={s.darkArea} onPointerMove={move} onPointerDown={move}>
        {darkButtons.map((b, i) => {
          const style = { left: `${b.left}%`, top: `${b.top}%` };
          const onFocus = (e: FocusEvent<HTMLButtonElement>) => {
            const rect = area.current?.getBoundingClientRect();
            const r = e.currentTarget.getBoundingClientRect();
            if (rect) setLight({ x: r.left - rect.left + r.width / 2, y: r.top - rect.top + r.height / 2 });
          };
          return b.agree
            ? <Agree key={i} style={style} className={s.darkButton} onFocus={onFocus} onClick={onSolved} />
            : <Disagree key={i} style={style} className={s.darkButton} onFocus={onFocus} onClick={onFailed} />;
        })}
        <div className={s.darkness} style={{ background: `radial-gradient(circle at ${light.x}px ${light.y}px, transparent 0, transparent 60px, rgba(8,7,5,.985) 105px)` }} />
      </div>
    </Stage>
  );
}
