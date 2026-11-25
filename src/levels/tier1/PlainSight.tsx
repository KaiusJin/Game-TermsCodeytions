import type { LevelProps } from '../../game/types';
import { Agree, Row, Stage } from '../shared/controls';
import s from './PlainSight.module.css';

export function PlainSight({ onSolved, onFailed }: LevelProps) {
  return (
    <Stage>
      <p className={s.legal}>
        <b>§4.2 Consent.</b> The parties acknowledge that buttons are a social construct. In lieu of a button, the user may
        simply <button type="button" className={s.inlineWord} onClick={onSolved}>agree</button> with this sentence, whereupon
        Codey shall be very pleased and the agreement shall take effect immediately.
      </p>
      <Row><Agree className={s.huge} onClick={onFailed}>AGREE</Agree></Row>
      <p className={s.caption}>decorative button · do not press</p>
    </Stage>
  );
}
