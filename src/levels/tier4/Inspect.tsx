import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { LevelProps } from '../../game/types';
import { Agree, Stage } from '../shared/controls';
import s from './Inspect.module.css';

export function Inspect({ onSolved }: LevelProps) {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [flash, setFlash] = useState('');
  return (
    <Stage className={s.inspectStage}>
      <div className={s.inspectBar}>
        <span>preview</span>
        <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} title="Developer tools">{'</>'}</button>
      </div>
      <div className={s.inspectBody}>
        <Agree disabled={disabled} onClick={onSolved} className={open ? s.outlined : ''} />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div className={s.devtools} initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}>
            <div className={s.devTabs}><b>Elements</b><span>Console</span><span>Sources</span></div>
            <pre className={s.dom}>
              {'▾ <div class="signoff">\n    <button '}
              <button type="button" className={s.attr} data-flash={flash === 'class'} onClick={() => setFlash('class')}>class=<i>"agree"</i></button>{' '}
              {disabled && <><button type="button" className={s.attr} onClick={() => setDisabled(false)}>disabled</button>{' '}</>}
              <button type="button" className={s.attr} data-flash={flash === 'type'} onClick={() => setFlash('type')}>type=<i>"button"</i></button>
              {'>Agree</button>\n  </div>'}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </Stage>
  );
}
