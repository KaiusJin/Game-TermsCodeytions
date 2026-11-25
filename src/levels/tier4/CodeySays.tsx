import { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import type { LevelProps } from '../../game/types';
import { asset } from '../../assets';
import { Agree, Disagree, Row, Stage } from '../shared/controls';
import s from './CodeySays.module.css';

const orders = ['Click Disagree.', 'Codey says: wait…', 'Click Agree.', 'Codey says: don’t click anything.', 'Codey says: click Agree.'];

const winning = orders.length - 1;

export function CodeySays({ onSolved, onFailed }: LevelProps) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const timer = window.setTimeout(() => setI((i + 1) % orders.length), 2300);
    return () => window.clearTimeout(timer);
  }, [i]);
  return (
    <Stage className={s.saysStage}>
      <div className={s.says}>
        <img src={asset('codey/codey_sitting.svg')} alt="" />
        <AnimatePresence mode="wait">
          <m.div key={i} className={s.order} initial={{ scale: .8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}>
            {orders[i]}
            <m.i initial={{ scaleX: 1 }} animate={{ scaleX: 0 }} transition={{ duration: 2.3, ease: 'linear' }} />
          </m.div>
        </AnimatePresence>
      </div>
      <Row>
        <Disagree onClick={onFailed} />
        <Agree onClick={() => (i === winning ? onSolved() : onFailed())} />
      </Row>
    </Stage>
  );
}
