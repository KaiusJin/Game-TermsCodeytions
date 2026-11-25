import { useEffect, useRef, useState, type MouseEvent, type PointerEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { LevelProps } from '../../game/types';
import { Agree, Stage } from '../shared/controls';
import s from './Claw.module.css';

type ClawPhase = 'idle' | 'down' | 'grab' | 'up' | 'carry' | 'release' | 'done';

const capsules = [
  { x: 26, label: 'NOPE', color: '#e4ebf6' },
  { x: 46, label: 'LATER', color: '#d8f0dd' },
  { x: 68, label: 'AGREE', color: '#8db8ff', agree: true },
  { x: 87, label: 'NO', color: '#ffd0c9' },
];

const chuteX = 9;

export function Claw({ onSolved, onFailed }: LevelProps) {
  const [x, setX] = useState(40);
  const [dir, setDir] = useState(0);
  const [phase, setPhase] = useState<ClawPhase>('idle');
  const [grabbed, setGrabbed] = useState<number | null>(null);
  const xRef = useRef(x);

  useEffect(() => {
    if (dir === 0 || phase !== 'idle') return;
    let frame = 0;
    let last = performance.now();
    const tick = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      xRef.current = Math.min(92, Math.max(16, xRef.current + dir * 32 * dt));
      setX(xRef.current);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [dir, phase]);

  useEffect(() => {
    let timer = 0;
    if (phase === 'down') timer = window.setTimeout(() => {
      const hit = capsules.findIndex(c => Math.abs(c.x - xRef.current) < 5);
      setGrabbed(hit >= 0 ? hit : null);
      setPhase('grab');
    }, 950);
    if (phase === 'grab') timer = window.setTimeout(() => setPhase('up'), 450);
    if (phase === 'up') timer = window.setTimeout(() => setPhase(grabbed === null ? 'idle' : 'carry'), 950);
    if (phase === 'carry') timer = window.setTimeout(() => setPhase('release'), 1100);
    if (phase === 'release') timer = window.setTimeout(() => {
      if (grabbed !== null && capsules[grabbed].agree) setPhase('done'); else onFailed();
    }, 750);
    return () => window.clearTimeout(timer);
  }, [phase, grabbed, onFailed]);

  useEffect(() => {
    const down = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); setDir(e.key === 'ArrowLeft' ? -1 : 1); }
    };
    const up = (e: globalThis.KeyboardEvent) => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') setDir(0); };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); };
  }, []);

  const busy = phase !== 'idle';
  const lowered = phase === 'down' || phase === 'grab';
  const closed = phase === 'grab' || phase === 'up' || phase === 'carry';
  const carrying = grabbed !== null && (phase === 'grab' || phase === 'up' || phase === 'carry');
  const atChute = phase === 'carry' || phase === 'release' || phase === 'done';
  const holdProps = (d: number) => ({
    onPointerDown: (e: PointerEvent<HTMLButtonElement>) => { e.currentTarget.setPointerCapture(e.pointerId); setDir(d); },
    onPointerUp: () => setDir(0), onPointerCancel: () => setDir(0), onLostPointerCapture: () => setDir(0),
    onContextMenu: (e: MouseEvent) => e.preventDefault(),
  });

  return (
    <Stage className={s.clawStage}>
      <div className={s.machine}>
        <div className={s.marquee}><span>★</span> CSC ARCADE <span>★</span><small>FREE PLAY · 1 CREDIT</small></div>
        <div className={s.glass}>
          <div className={s.rail} />
          <motion.div className={s.carriage} initial={false} animate={{ left: `${atChute ? chuteX : x}%` }} transition={{ duration: phase === 'carry' ? 1 : 0, ease: 'easeInOut' }}>
            <div className={s.trolley} />
            <motion.div className={s.cable} initial={false} animate={{ height: lowered ? 150 : 18 }} transition={{ duration: .9, ease: 'easeInOut' }} />
            <svg className={s.claw} viewBox="0 0 64 52" aria-hidden="true">
              <rect x="22" y="0" width="20" height="12" rx="3" fill="#16140f" />
              <motion.path initial={false} animate={{ d: closed ? 'M24 10 L14 30 L26 46' : 'M24 10 L6 30 L12 48' }} transition={{ duration: .3 }} stroke="#1d2f52" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <motion.path initial={false} animate={{ d: closed ? 'M40 10 L50 30 L38 46' : 'M40 10 L58 30 L52 48' }} transition={{ duration: .3 }} stroke="#1d2f52" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {carrying && grabbed !== null && <span className={`${s.capsule} ${s.carried}`} style={{ background: capsules[grabbed].color }}>{capsules[grabbed].label}</span>}
          </motion.div>
          {capsules.map((c, i) => {
            if (grabbed === i && (carrying || phase === 'done')) return null;
            if (grabbed === i && phase === 'release') {
              return <motion.span key={i} className={s.capsule} style={{ left: `${chuteX}%`, background: c.color }} initial={{ top: 60 }} animate={{ top: 300, rotate: 40 }} transition={{ duration: .6, ease: 'easeIn' }}>{c.label}</motion.span>;
            }
            return <span key={i} className={`${s.capsule} ${s.resting}`} style={{ left: `${c.x}%`, background: c.color }} data-agree={c.agree ?? false}>{c.label}</span>;
          })}
          <div className={s.chute}><span>PRIZE</span></div>
          <div className={s.floor} />
        </div>
        <div className={s.panel}>
          <div className={s.tray}>
            <AnimatePresence>{phase === 'done' && <motion.div initial={{ y: -30, scale: .6 }} animate={{ y: 0, scale: 1 }}><Agree onClick={onSolved} /></motion.div>}</AnimatePresence>
            {phase !== 'done' && <span>prize tray</span>}
          </div>
          <div className={s.controls}>
            <button type="button" className={s.arrow} disabled={busy} aria-label="Move claw left (hold)" {...holdProps(-1)}>◀</button>
            <button type="button" className={s.arrow} disabled={busy} aria-label="Move claw right (hold)" {...holdProps(1)}>▶</button>
            <button type="button" className={s.drop} disabled={busy} onClick={() => setPhase('down')}>DROP</button>
          </div>
        </div>
      </div>
    </Stage>
  );
}
