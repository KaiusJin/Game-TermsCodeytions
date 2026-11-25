import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { LevelProps } from '../../game/types';
import { asset } from '../../assets';
import { Agree, Stage } from '../shared/controls';
import s from './AskCodey.module.css';

export function AskCodey({ onSolved, onFailed }: LevelProps) {
  const [asked, setAsked] = useState(false);
  return (
    <Stage className={s.askStage}>
      <div className={s.codeyBox}>
        <motion.button type="button" className={s.codeyButton} aria-label="Ask Codey" onClick={() => setAsked(true)} animate={asked ? { y: [0, -14, 0] } : {}} transition={{ duration: .4 }}>
          <img src={asset('codey/codey_sitting.svg')} alt="" />
        </motion.button>
        <AnimatePresence>
          {asked && <motion.div className={s.bubble} initial={{ scale: 0 }} animate={{ scale: 1 }}>Woof! I agree.</motion.div>}
          {asked && (
            <motion.button type="button" className={s.sign} onClick={onSolved} initial={{ y: 60, rotate: 0, opacity: 0 }} animate={{ y: 0, rotate: -8, opacity: 1 }}>
              AGREE
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      <Agree className={s.bigDecoy} onClick={onFailed}>AGREE</Agree>
    </Stage>
  );
}
