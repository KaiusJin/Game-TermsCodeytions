import { useState } from 'react';
import { m } from 'framer-motion';
import type { LevelProps } from '../../game/types';
import { Agree, Stage } from '../shared/controls';
import s from './Vending.module.css';

const snacks = ['Disagree', 'Nope', 'Later', 'Maybe', 'No thx', 'AGREE', 'Unsub', '404', 'Snacks'];

const codes = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'];

export function Vending({ onSolved, onFailed }: LevelProps) {
  const [credit, setCredit] = useState(0);
  const [entry, setEntry] = useState('');
  const [message, setMessage] = useState('INSERT $1.00');
  const [vended, setVended] = useState(false);
  const [dropping, setDropping] = useState<number | null>(null);
  function coin(cents: number) {
    if (cents === 200) { setMessage('EXACT CHANGE ONLY'); return; }
    const next = credit + cents;
    setCredit(next);
    setMessage(`CREDIT $${(next / 100).toFixed(2)}`);
  }
  function key(k: string) {
    if (k === 'CLR') { setEntry(''); return; }
    if (k === 'OK') {
      const index = codes.indexOf(entry);
      if (index < 0) { setMessage('INVALID CODE'); setEntry(''); return; }
      if (credit < 100) { setMessage('INSERT $1.00'); return; }
      setDropping(index);
      window.setTimeout(() => (index === 5 ? setVended(true) : onFailed()), 800);
      return;
    }
    setEntry((/[A-C]/.test(k) ? k : entry.slice(0, 1) + k).slice(0, 2));
  }
  return (
    <Stage className={s.vendStage}>
      <div className={s.vending}>
        <div className={s.vendGlass}>
          {snacks.map((snack, i) => (
            <div key={snack} className={s.slotItem}>
              <m.span className={s.snack} data-agree={i === 5} animate={dropping === i ? { y: 220, rotate: 25, opacity: 0 } : { y: 0 }} transition={{ duration: .7, ease: 'easeIn' }}>{snack}</m.span>
              <span className={s.code}>{codes[i]} · $1.00</span>
            </div>
          ))}
          <div className={s.vendTray}>{vended ? <Agree onClick={onSolved} /> : <span>PUSH</span>}</div>
        </div>
        <div className={s.vendPanel}>
          <div className={s.lcd}><span>{message}</span><strong>{entry || '__'}</strong></div>
          <div className={s.keypad}>
            {['A', 'B', 'C', '1', '2', '3', 'CLR', 'OK'].map(k => <button key={k} type="button" disabled={dropping !== null} onClick={() => key(k)} data-wide={k === 'OK' || k === 'CLR'}>{k}</button>)}
          </div>
          <div className={s.coins}>
            <button type="button" onClick={() => coin(25)} className={s.quarter} aria-label="Insert quarter">25¢</button>
            <button type="button" onClick={() => coin(100)} className={s.loonie} aria-label="Insert loonie">$1</button>
            <button type="button" onClick={() => coin(200)} className={s.toonie} aria-label="Insert toonie">$2</button>
          </div>
        </div>
      </div>
    </Stage>
  );
}
