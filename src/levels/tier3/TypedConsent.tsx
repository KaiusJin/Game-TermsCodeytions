import { useEffect, useRef, useState } from 'react';
import type { LevelProps } from '../../game/types';
import { Agree, Row, Stage } from '../shared/controls';
import s from './TypedConsent.module.css';

const target = 'AGREE';

const keyboardKeys = ['Q', 'A', 'Z', 'G', 'R', 'X', 'E', 'D'];

export function TypedConsent({ onSolved, onFailed }: LevelProps) {
  const [typed, setTyped] = useState(0);
  const typedRef = useRef(0);
  function feed(letter: string) {
    const t = typedRef.current;
    const next = letter === target[t] ? t + 1 : letter === target[0] ? 1 : 0;
    typedRef.current = next;
    setTyped(next);
  }
  useEffect(() => {
    function onKey(e: globalThis.KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 'Enter' && typedRef.current === 5) { e.preventDefault(); onSolved(); return; }
      if (/^[a-z]$/i.test(e.key) && typedRef.current < 5) feed(e.key.toUpperCase());
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onSolved]);
  return (
    <Stage>
      <div className={s.typed} aria-live="polite">
        {[...target].map((c, i) => <span key={i} data-on={i < typed}>{c}</span>)}
      </div>
      <div className={s.keys}>
        {keyboardKeys.map(k => <button key={k} type="button" className={s.key} disabled={typed === 5} onClick={() => feed(k)}>{k}</button>)}
        <button type="button" className={`${s.key} ${s.enter}`} onClick={() => (typed === 5 ? onSolved() : onFailed())}>⏎ Enter</button>
      </div>
      <Row><Agree className={typed === 5 ? s.glow : ''} onClick={() => (typed === 5 ? onSolved() : onFailed())} /></Row>
    </Stage>
  );
}
