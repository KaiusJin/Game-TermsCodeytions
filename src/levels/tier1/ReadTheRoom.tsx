import { useState } from 'react';
import { m } from 'framer-motion';
import type { LevelProps } from '../../game/types';
import { Agree, Disagree, Row, Stage } from '../shared/controls';
import s from './ReadTheRoom.module.css';

export function ReadTheRoom({ onSolved, onFailed }: LevelProps) {
  const [count, setCount] = useState(0);
  return (
    <Stage>
      <p className={s.center}>Codey’s feelings meter</p>
      <div className={s.pips} aria-label={`Disagree pressed ${count} times`}>
        {[0, 1].map(i => <m.span key={i} animate={{ scale: count > i ? [1, 1.4, 1] : 1 }} data-on={count > i} />)}
      </div>
      <Row>
        <Disagree onClick={() => (count >= 2 ? onFailed() : setCount(count + 1))} />
        <Agree onClick={() => (count === 2 ? onSolved() : onFailed())} />
      </Row>
    </Stage>
  );
}
