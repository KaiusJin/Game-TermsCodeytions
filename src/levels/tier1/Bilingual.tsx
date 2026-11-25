import type { LevelProps } from '../../game/types';
import { Agree, Disagree, Stage } from '../shared/controls';
import s from './Bilingual.module.css';

export function Bilingual({ onSolved, onFailed }: LevelProps) {
  return (
    <Stage>
      <div className={s.bilingual}>
        <div>
          <span className={s.lang}>English</span>
          <p>Do you accept these terms?</p>
          <div className={s.pending}><Agree onClick={onFailed} /><span>pending translation review</span></div>
          <Disagree onClick={onFailed} />
        </div>
        <div>
          <span className={s.lang}>Français</span>
          <p>Acceptez-vous ces conditions ?</p>
          <Disagree onClick={onFailed}>Je refuse</Disagree>
          <Agree onClick={onSolved}>J’accepte</Agree>
        </div>
      </div>
    </Stage>
  );
}
