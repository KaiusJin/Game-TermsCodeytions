import type { LevelProps } from '../../game/types';
import { Agree, Row, Stage } from '../shared/controls';
import s from './FinePrint.module.css';

export function FinePrint({ onSolved, onFailed }: LevelProps) {
  return (
    <Stage>
      <Row><Agree className={s.huge} onClick={onFailed}>AGREE</Agree></Row>
      <div className={s.fine}>
        <p>* Pressing the large button above constitutes an acknowledgement that large buttons are for decoration purposes only and do not constitute agreement within the meaning of §12(b).</p>
        <p>** Agreement may be entered into solely by way of the official button, which, in accordance with the Button Size Reduction Act, has been reduced to the smallest legally permissible dimensions and placed at the end of this sentence <button type="button" className={s.dot} aria-label="Agree" onClick={onSolved} /></p>
      </div>
    </Stage>
  );
}
