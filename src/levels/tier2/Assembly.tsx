import { useState } from 'react';
import { motion } from 'framer-motion';
import type { LevelProps } from '../../game/types';
import { Agree, Row, Stage } from '../shared/controls';
import s from './Assembly.module.css';

const parts = ['E', 'D', 'R', 'A', 'S', 'G', 'I', 'E'];

export function Assembly({ onSolved }: LevelProps) {
  const [slots, setSlots] = useState<number[]>([]);
  const word = slots.map(i => parts[i]).join('');
  const done = word === 'AGREE';
  return (
    <Stage>
      <div className={s.slots}>
        {Array.from({ length: 5 }, (_, i) => (
          <button key={i} type="button" className={s.slot} data-filled={slots[i] !== undefined} aria-label={slots[i] !== undefined ? `Remove ${parts[slots[i]]}` : 'Empty slot'} onClick={() => setSlots(slots.filter((_, j) => j !== i))}>{slots[i] !== undefined ? parts[slots[i]] : ''}</button>
        ))}
      </div>
      <div className={s.parts}>
        {parts.map((letter, i) => (
          <motion.button key={i} layout type="button" className={s.part} disabled={slots.includes(i) || slots.length >= 5} onClick={() => setSlots([...slots, i])} style={{ rotate: (i % 3 - 1) * 6 }}>{letter}</motion.button>
        ))}
      </div>
      <Row><Agree disabled={!done} onClick={onSolved}>{done ? 'Agree ✓' : word.length === 5 ? `${word}?` : 'A _ _ _ _'}</Agree></Row>
    </Stage>
  );
}
