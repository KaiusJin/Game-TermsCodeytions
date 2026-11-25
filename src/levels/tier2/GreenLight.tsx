import { useEffect, useState } from 'react';
import type { LevelProps } from '../../game/types';
import { Agree, Stage } from '../shared/controls';
import s from './GreenLight.module.css';

const lightCycle = [{ color: 'red', ms: 1600 }, { color: 'green', ms: 1100 }, { color: 'yellow', ms: 700 }] as const;

export function GreenLight({ onSolved, onFailed }: LevelProps) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = window.setTimeout(() => setIndex((index + 1) % lightCycle.length), lightCycle[index].ms);
    return () => window.clearTimeout(timer);
  }, [index]);
  const color = lightCycle[index].color;
  return (
    <Stage className={s.lightStage}>
      <div className={s.light} aria-label={`Signal is ${color}`} role="img">
        {(['red', 'yellow', 'green'] as const).map(c => <span key={c} data-color={c} data-on={c === color} />)}
      </div>
      <Agree onClick={() => (color === 'green' ? onSolved() : onFailed())} />
    </Stage>
  );
}
