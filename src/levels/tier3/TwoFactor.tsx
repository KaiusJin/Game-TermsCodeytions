import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { LevelProps } from '../../game/types';
import { Agree, Stage } from '../shared/controls';
import s from './TwoFactor.module.css';

export function TwoFactor({ onSolved }: LevelProps) {
  const [peek, setPeek] = useState(false);
  const [code, setCode] = useState('');
  useEffect(() => {
    if (!peek) return;
    const timer = window.setTimeout(() => setPeek(false), 2500);
    return () => window.clearTimeout(timer);
  }, [peek]);
  return (
    <Stage className={s.tfaStage}>
      <div className={s.tfaForm}>
        <label htmlFor="tfa">Enter the 6-digit code</label>
        <input id="tfa" className={s.tfaInput} inputMode="numeric" maxLength={6} value={code} onChange={e => setCode(e.target.value.replace(/\D/g, ''))} placeholder="••••••" autoComplete="off" />
        <Agree disabled={code !== '314159'} onClick={onSolved} />
      </div>
      <button type="button" className={s.phone} onClick={() => setPeek(true)} aria-label="Codey’s phone">
        <span className={s.notch} />
        <AnimatePresence>
          {peek ? (
            <motion.span className={s.notif} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }}>
              <b>CSC Auth</b>Your code is <strong>314159</strong>
            </motion.span>
          ) : <motion.span className={s.buzz} animate={{ rotate: [0, -6, 6, -6, 0] }} transition={{ repeat: Infinity, repeatDelay: 1.2, duration: .35 }}>📳</motion.span>}
        </AnimatePresence>
      </button>
    </Stage>
  );
}
