import type { LevelProps } from '../../game/types';
import { Stage } from '../shared/controls';
import s from './Classified.module.css';

// Every label is its plain-text meaning shifted three letters along the alphabet.
const labels = [
  { cipher: 'GLVDJUHH', agree: false },
  { cipher: 'PDBEH', agree: false },
  { cipher: 'DJUHH', agree: true },
  { cipher: 'OHWHU', agree: false },
  { cipher: 'QR', agree: false },
];

export function Classified({ onSolved, onFailed }: LevelProps) {
  return (
    <Stage className={s.stage}>
      <div className={s.folder}>
        <span className={s.stamp}>TOP SECRET</span>
        <div className={s.buttons}>
          {labels.map(l => <button key={l.cipher} type="button" className={s.cipher} onClick={l.agree ? onSolved : onFailed}>{l.cipher}</button>)}
        </div>
      </div>
    </Stage>
  );
}
