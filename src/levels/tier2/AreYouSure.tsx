import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { LevelProps } from '../../game/types';
import { Agree, Row, Stage } from '../shared/controls';
import s from './AreYouSure.module.css';

const sureQuestions = ['Are you sure you want to agree?', 'Really sure?', 'Legally, morally and emotionally sure?', 'Do you want to cancel your agreement?'];

export function AreYouSure({ onSolved, onFailed }: LevelProps) {
  const [step, setStep] = useState(-1);
  function answer(yes: boolean) {
    const last = step === sureQuestions.length - 1;
    if (last) { if (yes) onFailed(); else onSolved(); return; }
    if (!yes) { onFailed(); return; }
    setStep(step + 1);
  }
  const yes = <button key="yes" type="button" className="button primary" onClick={() => answer(true)}>Yes</button>;
  const no = <button key="no" type="button" className="button secondary" onClick={() => answer(false)}>No</button>;
  return (
    <Stage className={s.sureStage}>
      <Row><Agree onClick={() => setStep(0)} disabled={step >= 0} /></Row>
      <AnimatePresence mode="wait">
        {step >= 0 && (
          <motion.div key={step} className={s.modal} role="alertdialog" aria-label={sureQuestions[step]} initial={{ scale: .7, opacity: 0, rotate: step % 2 ? 2 : -2 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: .9, opacity: 0 }} transition={{ duration: .18 }}>
            <span className={s.modalBar}>confirm ({step + 1}/{sureQuestions.length})</span>
            <p>{sureQuestions[step]}</p>
            <div className={s.modalButtons}>{step % 2 === 0 ? [yes, no] : [no, yes]}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </Stage>
  );
}
