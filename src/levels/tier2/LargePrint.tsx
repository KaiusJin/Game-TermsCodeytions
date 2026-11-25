import { useState } from 'react';
import type { LevelProps } from '../../game/types';
import { Agree, Disagree, Stage } from '../shared/controls';
import s from './LargePrint.module.css';

// Slider 0–100 maps exponentially to 1×–14×; magnification is centred on the “gree” of Disagree,
// and 14× makes those four letters fill the viewport.
const scaleFor = (v: number) => 14 ** (v / 100);

export function LargePrint({ onSolved, onFailed }: LevelProps) {
  const [zoom, setZoom] = useState(100);
  const scale = scaleFor(zoom);
  return (
    <Stage>
      <div className={s.viewport}>
        <div className={s.content} style={{ transform: `scale(${scale})` }}>
          <Disagree className={s.no} onClick={onFailed} />
          <Agree className={s.yes} onClick={onSolved} />
        </div>
      </div>
      <label className={s.zoom}>
        <span>Zoom</span>
        <input type="range" min={0} max={100} value={zoom} onChange={e => setZoom(Number(e.target.value))} aria-label="Zoom" />
        <output>{Math.round(scale * 100)}%</output>
      </label>
    </Stage>
  );
}
