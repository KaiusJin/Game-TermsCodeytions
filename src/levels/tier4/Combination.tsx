import { useState } from 'react';
import { motion } from 'framer-motion';
import type { LevelProps } from '../../game/types';
import { Agree, Stage } from '../shared/controls';
import s from './Combination.module.css';

export function Combination({ onSolved }: LevelProps) {
  const [dials, setDials] = useState([5, 5, 5]);
  const [open, setOpen] = useState(false);
  const [shake, setShake] = useState(0);
  const turn = (i: number, d: number) => setDials(dials.map((v, j) => (j === i ? (v + d + 10) % 10 : v)));
  return (
    <Stage>
      <p className={s.comboText}>
        This agreement is entered into by <b>2</b> parties, offers <b>0</b> refunds, and is witnessed by <b>6</b> geese of questionable character.
      </p>
      <div className={s.safe}>
        <motion.div className={s.safeDoor} animate={open ? { rotateY: -110 } : { x: shake % 2 ? [0, -8, 8, -4, 0] : [0, 8, -8, 4, 0] }} transition={{ duration: open ? .8 : .35 }} style={{ transformOrigin: 'left center' }}>
          <div className={s.dials}>
            {dials.map((v, i) => (
              <div key={i} className={s.dial}>
                <button type="button" aria-label={`Dial ${i + 1} up`} onClick={() => turn(i, 1)} disabled={open}>▲</button>
                <motion.span key={v} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>{v}</motion.span>
                <button type="button" aria-label={`Dial ${i + 1} down`} onClick={() => turn(i, -1)} disabled={open}>▼</button>
              </div>
            ))}
          </div>
          <button type="button" className="button dark" disabled={open} onClick={() => (dials.join('') === '206' ? setOpen(true) : setShake(shake + 1))}>Open</button>
        </motion.div>
        <div className={s.safeInside}>{open && <Agree onClick={onSolved} />}</div>
      </div>
    </Stage>
  );
}
