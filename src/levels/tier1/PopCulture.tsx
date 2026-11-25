import { useState } from 'react';
import type { LevelProps } from '../../game/types';
import { Agree, Stage } from '../shared/controls';
import s from './PopCulture.module.css';

const bubbleCount = 24;
// The bubble packed "with extra care" is a slightly darker one.
const special = 17;

export function PopCulture({ onSolved }: LevelProps) {
  const [popped, setPopped] = useState<number[]>([]);
  return (
    <Stage className={s.wrapStage}>
      <div className={s.sheet}>
        {Array.from({ length: bubbleCount }, (_, i) => {
          if (i === special && popped.includes(i)) return <div key={i} className={s.cell}><Agree className={s.prize} onClick={onSolved} /></div>;
          return (
            <div key={i} className={s.cell}>
              <button type="button" aria-label={`Bubble ${i + 1}`} className={s.bubble} data-special={i === special} data-popped={popped.includes(i)} disabled={popped.includes(i)} onClick={() => setPopped([...popped, i])} />
            </div>
          );
        })}
      </div>
    </Stage>
  );
}
