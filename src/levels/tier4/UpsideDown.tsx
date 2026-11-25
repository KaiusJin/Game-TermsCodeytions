import { useRef, useState, type PointerEvent } from 'react';
import { motion } from 'framer-motion';
import type { LevelProps } from '../../game/types';
import { Agree, Disagree, Stage } from '../shared/controls';
import s from './UpsideDown.module.css';

function normalise(angle: number) { return ((angle % 360) + 540) % 360 - 180; }

export function UpsideDown({ onSolved, onFailed }: LevelProps) {
  const [angle, setAngle] = useState(180);
  const knob = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const upright = Math.abs(normalise(angle)) <= 10;
  function fromPointer(e: PointerEvent<HTMLDivElement>) {
    const r = knob.current?.getBoundingClientRect();
    if (!r) return;
    const deg = Math.atan2(e.clientX - (r.left + r.width / 2), -(e.clientY - (r.top + r.height / 2))) * 180 / Math.PI;
    setAngle(Math.round(deg / 5) * 5);
  }
  return (
    <Stage className={s.rotateStage}>
      <div className={s.rotDocWrap}>
        <motion.div className={s.rotDoc} animate={{ rotate: angle }} transition={{ type: 'spring', stiffness: 200, damping: 22 }}>
          <strong>Terms (AU edition)</strong>
          <p>No worries, mate. Sign below.</p>
          <div className={s.rotButtons}><Disagree onClick={onFailed} /><Agree onClick={() => (upright ? onSolved() : onFailed())} /></div>
        </motion.div>
      </div>
      <div className={s.knobBox}>
        <div ref={knob} className={s.knob} role="slider" tabIndex={0} aria-label="Rotate document" aria-valuemin={-180} aria-valuemax={180} aria-valuenow={normalise(angle)}
          onPointerDown={e => { dragging.current = true; e.currentTarget.setPointerCapture(e.pointerId); fromPointer(e); }}
          onPointerMove={e => { if (dragging.current) fromPointer(e); }}
          onPointerUp={() => { dragging.current = false; }}
          onKeyDown={e => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); setAngle(angle - 15); }
            if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); setAngle(angle + 15); }
          }}>
          <span className={s.knobPointer} style={{ transform: `rotate(${angle}deg)` }} />
        </div>
        <output>{normalise(angle)}°</output>
      </div>
    </Stage>
  );
}
