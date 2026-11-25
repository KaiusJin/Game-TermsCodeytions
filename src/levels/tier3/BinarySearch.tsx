import { useState } from 'react';
import type { LevelProps } from '../../game/types';
import { Agree, Row, Stage } from '../shared/controls';
import s from './BinarySearch.module.css';

const maxGuesses = 7;

export function BinarySearch({ onSolved, onFailed }: LevelProps) {
  const [secret] = useState(() => 1 + Math.floor(Math.random() * 100));
  const [value, setValue] = useState('');
  const [guesses, setGuesses] = useState<number[]>([]);
  const found = guesses.at(-1) === secret;
  const last = guesses.at(-1);

  function guess() {
    const n = Number(value);
    if (!Number.isInteger(n) || n < 1 || n > 100 || found) return;
    const next = [...guesses, n];
    setGuesses(next);
    setValue('');
    if (n !== secret && next.length >= maxGuesses) onFailed();
  }

  const answer = last === undefined ? 'Guess a number from 1 to 100.' : found ? `Yes! It was ${secret}.` : last < secret ? 'Higher ↑' : 'Lower ↓';
  return (
    <Stage>
      <div className={s.game}>
        <output className={s.answer} aria-live="polite" aria-label="Codey’s answer" data-found={found}>{answer}</output>
        <div className={s.form}>
          <input aria-label="Your guess" inputMode="numeric" value={value} disabled={found} onChange={e => setValue(e.target.value.replace(/\D/g, '').slice(0, 3))} onKeyDown={e => { if (e.key === 'Enter') guess(); }} />
          <button type="button" className="button secondary" disabled={found} onClick={guess}>Guess</button>
        </div>
        <div className={s.history}>
          {Array.from({ length: maxGuesses }, (_, i) => <span key={i} data-used={i < guesses.length}>{guesses[i] ?? ''}</span>)}
        </div>
      </div>
      <Row><Agree disabled={!found} onClick={onSolved} /></Row>
    </Stage>
  );
}
