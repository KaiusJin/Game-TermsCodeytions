import { useState } from 'react';
import type { LevelProps } from '../../game/types';
import { Agree, Row, Stage } from '../shared/controls';
import s from './Telegraph.module.css';

const morse: Record<string, string> = { '.-': 'A', '-..': 'D', '.': 'E', '--.': 'G', '..': 'I', '.-.': 'R', '...': 'S' };

export function Telegraph({ onSolved }: LevelProps) {
  const [buffer, setBuffer] = useState('');
  const [message, setMessage] = useState('');
  const ready = message === 'AGREE' && buffer === '';
  const tap = (symbol: string) => setBuffer((buffer + symbol).slice(0, 5));
  function next() {
    if (!buffer) return;
    setMessage((message + (morse[buffer] ?? '?')).slice(0, 8));
    setBuffer('');
  }
  return (
    <Stage>
      <div className={s.tape} aria-live="polite" aria-label="Message">
        <span className={s.message}>{message || '…'}</span>
        <span className={s.buffer}>{buffer.replace(/\./g, '·').replace(/-/g, '—')}</span>
      </div>
      <div className={s.keys}>
        <button type="button" className={s.key} aria-label="Dot" onClick={() => tap('.')}>·</button>
        <button type="button" className={s.key} aria-label="Dash" onClick={() => tap('-')}>—</button>
        <button type="button" className="button secondary" onClick={next}>Next letter</button>
        <button type="button" className={s.clear} onClick={() => { setBuffer(''); setMessage(''); }}>Clear</button>
      </div>
      <Row><Agree disabled={!ready} onClick={onSolved} /></Row>
    </Stage>
  );
}
