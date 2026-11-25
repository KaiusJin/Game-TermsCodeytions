import { useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { LevelProps } from '../../game/types';
import { Agree, Stage } from '../shared/controls';
import s from './Recursion.module.css';

const baseCase = 5;

export function Recursion({ onSolved, onFailed }: LevelProps) {
  const [depth, setDepth] = useState(0);
  function frame(d: number): ReactNode {
    const innermost = d === depth;
    return (
      <motion.div key={d} className={s.frame} initial={{ scale: .8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <span className={s.frameLabel}>agree({d})</span>
        <Agree
          className={s.frameAgree}
          onClick={() => (!innermost ? onFailed() : depth === baseCase ? onSolved() : setDepth(depth + 1))}
        >{innermost && depth === baseCase ? 'Agree (base case)' : 'Agree'}</Agree>
        {d < depth && frame(d + 1)}
      </motion.div>
    );
  }
  return <Stage className={s.recursionStage}>{frame(0)}</Stage>;
}
