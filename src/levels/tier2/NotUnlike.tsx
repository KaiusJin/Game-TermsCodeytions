import type { LevelProps } from '../../game/types';
import { Agree, Disagree, Row, Stage } from '../shared/controls';
import s from './NotUnlike.module.css';

export function NotUnlike({ onSolved, onFailed }: LevelProps) {
  return (
    <Stage className={s.stage}>
      <p className={s.question}>Would you be <em>unwilling</em> to <em>refrain</em> from <em>not</em> agreeing to these terms?</p>
      <Row>
        <Agree onClick={onFailed}>Yes</Agree>
        <Disagree onClick={onSolved}>No</Disagree>
      </Row>
    </Stage>
  );
}
