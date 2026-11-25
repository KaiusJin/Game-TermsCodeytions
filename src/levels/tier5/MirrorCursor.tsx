import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import type { LevelProps } from '../../game/types';
import { Stage } from '../shared/controls';
import s from './MirrorCursor.module.css';

// Targets are in percentages of the play area; clicks resolve at the mirrored point.
const mirrorTargets = [
  { id: 'agree', left: 6, top: 8, w: 22, h: 16 },
  { id: 'no1', left: 70, top: 74, w: 24, h: 16 },
  { id: 'no2', left: 40, top: 8, w: 24, h: 16 },
  { id: 'no3', left: 8, top: 74, w: 24, h: 16 },
];

export function MirrorCursor({ onSolved, onFailed }: LevelProps) {
  const area = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ x: 50, y: 50 });
  function mirror(e: PointerEvent<HTMLDivElement>) {
    const r = area.current?.getBoundingClientRect();
    if (!r) return;
    setCursor({ x: 100 - ((e.clientX - r.left) / r.width) * 100, y: 100 - ((e.clientY - r.top) / r.height) * 100 });
  }
  function click(at = cursor) {
    const hit = mirrorTargets.find(t => at.x >= t.left && at.x <= t.left + t.w && at.y >= t.top && at.y <= t.top + t.h);
    if (!hit) return;
    if (hit.id === 'agree') onSolved(); else onFailed();
  }
  function keys(e: KeyboardEvent<HTMLDivElement>) {
    const step = 4;
    // Arrow keys are mirrored too.
    const moves: Record<string, [number, number]> = { ArrowLeft: [step, 0], ArrowRight: [-step, 0], ArrowUp: [0, step], ArrowDown: [0, -step] };
    if (moves[e.key]) {
      e.preventDefault();
      setCursor(c => ({ x: Math.min(100, Math.max(0, c.x + moves[e.key][0])), y: Math.min(100, Math.max(0, c.y + moves[e.key][1])) }));
    }
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); click(); }
  }
  return (
    <Stage className={s.mirrorStage}>
      <div ref={area} className={s.mirrorArea} tabIndex={0} role="application" aria-label="Mirrored play area: arrow keys move the blue cursor (mirrored), Enter clicks"
        onPointerMove={mirror} onPointerDown={e => { mirror(e); }} onClick={e => {
          const r = area.current?.getBoundingClientRect();
          if (r) click({ x: 100 - ((e.clientX - r.left) / r.width) * 100, y: 100 - ((e.clientY - r.top) / r.height) * 100 });
        }} onKeyDown={keys}>
        <span className={s.axis} aria-hidden="true" />
        {mirrorTargets.map(t => (
          <span key={t.id} className={`button ${t.id === 'agree' ? 'primary' : 'secondary'} ${s.fakeButton}`} style={{ left: `${t.left}%`, top: `${t.top}%`, width: `${t.w}%`, height: `${t.h}%` }} aria-hidden="true">
            {t.id === 'agree' ? 'Agree' : 'Disagree'}
          </span>
        ))}
        <svg className={s.cursor} style={{ left: `${cursor.x}%`, top: `${cursor.y}%` }} width="26" height="30" viewBox="0 0 26 30" aria-hidden="true">
          <path d="M2 2 L2 24 L8 18 L13 28 L17 26 L12 16 L21 16 Z" fill="#2867d8" stroke="#ffffff" strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
      </div>
    </Stage>
  );
}
