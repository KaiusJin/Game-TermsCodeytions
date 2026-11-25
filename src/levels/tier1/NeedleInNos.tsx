import type { LevelProps } from '../../game/types';
import { Stage } from '../shared/controls';
import s from './NeedleInNos.module.css';

const needleDecoys = ['Disagree', 'Agre', 'Aggree', 'Agree?', 'Argee', 'Agreed', 'Disagre', 'Agee', 'Not agree', 'Agrée', 'Agreee', 'Ag ree', 'Degree', 'Agrees'];

const needleAnswer = 27;

export function NeedleInNos({ onSolved, onFailed }: LevelProps) {
  return (
    <Stage>
      <div className={s.needleGrid}>
        {Array.from({ length: 42 }, (_, i) => {
          const label = i === needleAnswer ? 'Agree' : needleDecoys[(i * 5 + 3) % needleDecoys.length];
          return <button key={i} type="button" className={s.needle} onClick={i === needleAnswer ? onSolved : onFailed}>{label}</button>;
        })}
      </div>
    </Stage>
  );
}
