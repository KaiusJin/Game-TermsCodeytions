import type { LevelProps } from '../../game/types';
import { Agree, Disagree, Row, Stage } from '../shared/controls';
import s from './OppositeDay.module.css';

export function OppositeDay({ onSolved, onFailed }: LevelProps) {
  return (
    <Stage className={s.opposite}>
      <div className={s.calendar} aria-hidden="true"><span>TODAY</span><strong>Opposite<br />Day</strong></div>
      <p className={s.center}>Do you accept the Terms &amp; Codeytions?</p>
      <Row><Agree onClick={onFailed} /><Disagree onClick={onSolved} /></Row>
    </Stage>
  );
}
