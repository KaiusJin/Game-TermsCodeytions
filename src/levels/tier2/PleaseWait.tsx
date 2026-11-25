import { useEffect, useState } from 'react';
import type { LevelProps } from '../../game/types';
import { Agree, Stage } from '../shared/controls';
import s from './PleaseWait.module.css';

export function PleaseWait({ onSolved, onFailed }: LevelProps) {
  const [phase, setPhase] = useState<'idle' | 'processing' | 'ready'>('idle');
  useEffect(() => {
    if (phase !== 'processing') return;
    const timer = window.setTimeout(() => setPhase('ready'), 3000);
    return () => window.clearTimeout(timer);
  }, [phase]);
  return (
    <Stage className={s.waitStage}>
      <div className={s.wheel} data-spinning={phase === 'processing'} aria-hidden="true"><span>🐹</span></div>
      {phase === 'idle' && <Agree onClick={() => setPhase('processing')} />}
      {phase === 'processing' && <button type="button" className={`button secondary ${s.processing}`} onClick={onFailed}>Processing… <small>(click to cancel)</small></button>}
      {phase === 'ready' && <Agree onClick={onSolved}>Confirm Agree</Agree>}
    </Stage>
  );
}
