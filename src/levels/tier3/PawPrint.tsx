import { useEffect, useState } from 'react';
import type { LevelProps } from '../../game/types';
import { Agree, Row, Stage } from '../shared/controls';
import s from './PawPrint.module.css';

// Zero-based toe beans; shown to players as beans 2, 4, 1, 3, 2.
const sequence = [1, 3, 0, 2, 1];
const step = 600;

export function PawPrint({ onSolved, onFailed }: LevelProps) {
  const [show, setShow] = useState(1);
  const [lit, setLit] = useState<number | null>(null);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const done = progress === sequence.length;

  useEffect(() => {
    const timers = sequence.flatMap((bean, i) => [
      window.setTimeout(() => setLit(bean), 700 + i * step),
      window.setTimeout(() => setLit(null), 700 + i * step + step * 0.6),
    ]);
    timers.push(window.setTimeout(() => setPlaying(false), 700 + sequence.length * step));
    return () => timers.forEach(t => window.clearTimeout(t));
  }, [show]);

  function tap(bean: number) {
    if (bean !== sequence[progress]) { onFailed(); return; }
    setProgress(progress + 1);
  }

  return (
    <Stage className={s.stage}>
      <div className={s.paw}>
        {[0, 1, 2, 3].map(bean => (
          <button key={bean} type="button" className={s.bean} data-bean={bean} data-lit={lit === bean} aria-label={`Toe bean ${bean + 1}`} disabled={playing || done} onClick={() => tap(bean)} />
        ))}
        <span className={s.pad} aria-hidden="true" />
      </div>
      <div className={s.controls}>
        <button type="button" className="button secondary" disabled={playing || done} onClick={() => { setProgress(0); setPlaying(true); setShow(show + 1); }}>Show me</button>
        <span className={s.dots} aria-label={`${progress} of ${sequence.length}`}>{sequence.map((_, i) => <i key={i} data-on={i < progress} />)}</span>
      </div>
      <Row><Agree disabled={!done} onClick={onSolved} /></Row>
    </Stage>
  );
}
