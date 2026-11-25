import { useState } from 'react';
import type { LevelProps } from '../../game/types';
import { Stage } from '../shared/controls';
import s from './TrueColours.module.css';

export function TrueColours({ onSolved, onFailed }: LevelProps) {
  const [hue, setHue] = useState(40);
  const blue = hue >= 208 && hue <= 226;
  return (
    <Stage className={s.colourStage}>
      <button type="button" className={`button ${s.hueButton}`} style={{ background: `hsl(${hue} 72% 50%)`, color: '#fff' }} onClick={() => (blue ? onSolved() : onFailed())}>Agree</button>
      <div className={s.hueControl}>
        <label htmlFor="hue">Button hue <output>{hue}°</output></label>
        <input id="hue" type="range" min={0} max={360} value={hue} onChange={e => setHue(Number(e.target.value))} className={s.hue} />
        <div className={s.swatches}><span style={{ background: '#2867d8' }} />CSC blue <span style={{ background: '#fff' }} />White</div>
      </div>
    </Stage>
  );
}
