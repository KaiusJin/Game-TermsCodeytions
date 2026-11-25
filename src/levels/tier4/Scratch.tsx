import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { motion } from 'framer-motion';
import type { LevelProps } from '../../game/types';
import { Agree, Disagree, Stage } from '../shared/controls';
import s from './Scratch.module.css';

function ScratchPanel({ prize, onPick }: { prize: 'Agree' | 'Disagree'; onPick: () => void }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const strokes = useRef(0);
  const down = useRef(false);
  useEffect(() => {
    const c = canvas.current;
    const ctx = c?.getContext('2d');
    if (!c || !ctx) return;
    const r = c.getBoundingClientRect();
    c.width = r.width;
    c.height = r.height;
    const g = ctx.createLinearGradient(0, 0, r.width, r.height);
    g.addColorStop(0, '#b7c4d8'); g.addColorStop(.5, '#eef3fa'); g.addColorStop(1, '#97a6c0');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, r.width, r.height);
    ctx.fillStyle = '#5f7190';
    ctx.font = '700 13px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('SCRATCH ✦', r.width / 2, r.height / 2 + 4);
  }, []);
  function scratch(e: PointerEvent<HTMLCanvasElement>) {
    if (!down.current) return;
    const c = canvas.current;
    const ctx = c?.getContext('2d');
    if (!c || !ctx) return;
    const r = c.getBoundingClientRect();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(e.clientX - r.left, e.clientY - r.top, 16, 0, Math.PI * 2);
    ctx.fill();
    strokes.current += 1;
    if (strokes.current > 28) setRevealed(true);
  }
  return (
    <div className={s.scratchPanel}>
      {prize === 'Agree' ? <Agree onClick={onPick} tabIndex={revealed ? 0 : -1} /> : <Disagree onClick={onPick} tabIndex={revealed ? 0 : -1} />}
      <motion.canvas ref={canvas} className={s.scratchCanvas} animate={{ opacity: revealed ? 0 : 1 }} style={{ pointerEvents: revealed ? 'none' : 'auto' }}
        tabIndex={revealed ? -1 : 0} role="button" aria-label="Scratch panel (Enter to scratch)"
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setRevealed(true); } }}
        onPointerDown={e => { down.current = true; e.currentTarget.setPointerCapture(e.pointerId); scratch(e); }}
        onPointerMove={scratch} onPointerUp={() => { down.current = false; }} />
    </div>
  );
}

export function Scratch({ onSolved, onFailed }: LevelProps) {
  return (
    <Stage className={s.scratchStage}>
      <div className={s.ticket}>
        <div className={s.ticketHead}><strong>LUCKY TERMS</strong><span>Match 1 to win consent!</span></div>
        <div className={s.scratchRow}>
          <ScratchPanel prize="Disagree" onPick={onFailed} />
          <ScratchPanel prize="Disagree" onPick={onFailed} />
          <ScratchPanel prize="Agree" onPick={onSolved} />
        </div>
      </div>
    </Stage>
  );
}
