import { useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import type { LevelProps } from '../../game/types';
import { Agree, Stage } from '../shared/controls';
import s from './StackPop.module.css';

const initialStack = ['Disagree', 'Maybe later', 'Remind me tomorrow', 'Ask my mom', 'Terms v2', 'Agree'];

export function StackPop({ onSolved, onFailed }: LevelProps) {
  const [stack, setStack] = useState(initialStack.map((label, i) => ({ label, id: i })));
  const nextId = useRef(initialStack.length);
  function pop() {
    if (stack[0]?.label === 'Agree') { onFailed(); return; }
    setStack(stack.slice(1));
  }
  function push() { setStack([{ label: 'Disagree', id: nextId.current++ }, ...stack]); }
  return (
    <Stage className={s.stackStage}>
      <div className={s.stack}>
        <span className={s.stackTop}>top ↓</span>
        <AnimatePresence initial={false}>
          {stack.map((item, i) => (
            <m.div key={item.id} layout className={s.card} data-agree={item.label === 'Agree'} initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ x: 200, rotate: 12, opacity: 0 }}>
              {item.label === 'Agree'
                ? <Agree disabled={i !== 0} onClick={onSolved} className={s.cardAgree} />
                : <span>{item.label}</span>}
            </m.div>
          ))}
        </AnimatePresence>
      </div>
      <div className={s.stackOps}>
        <button type="button" className="button dark" onClick={pop}>pop()</button>
        <button type="button" className="button secondary" onClick={push}>push()</button>
        <button type="button" className="button secondary" onClick={onFailed}>clear()</button>
      </div>
    </Stage>
  );
}
