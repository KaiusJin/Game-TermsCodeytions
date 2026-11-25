import { useState } from 'react';
import type { LevelProps } from '../../game/types';
import { asset } from '../../assets';
import { Duck, Goose } from '../shared/art';
import { Agree, Row, Stage } from '../shared/controls';
import s from './GooseCaptcha.module.css';

const captchaTiles = ['goose', 'codey', 'duck', 'duck', 'goose', 'goose', 'codey', 'goose', 'duck'] as const;

export function GooseCaptcha({ onSolved, onFailed }: LevelProps) {
  const [picked, setPicked] = useState<number[]>([]);
  const [verified, setVerified] = useState(false);
  function verify() {
    const correct = captchaTiles.flatMap((tile, i) => (tile === 'goose' ? [i] : []));
    if (correct.length === picked.length && correct.every(i => picked.includes(i))) setVerified(true);
    else onFailed();
  }
  return (
    <Stage>
      <div className={s.captcha}>
        <div className={s.captchaHead}><small>Select all squares with</small><strong>a Canada goose</strong><small>If there are none, click skip (there is no skip)</small></div>
        <div className={s.captchaGrid}>
          {captchaTiles.map((tile, i) => (
            <button key={i} type="button" disabled={verified} aria-pressed={picked.includes(i)} aria-label={`Tile ${i + 1}`} className={s.tile} onClick={() => setPicked(picked.includes(i) ? picked.filter(p => p !== i) : [...picked, i])}>
              {tile === 'goose' && <Goose size={64} className={i % 2 ? s.flip : ''} />}
              {tile === 'duck' && <Duck size={60} />}
              {tile === 'codey' && <img src={asset('codey/codey_sitting.svg')} alt="" />}
            </button>
          ))}
        </div>
        <div className={s.captchaFoot}>
          {verified ? <span className={s.verified}>✓ Verified human</span> : <button type="button" className="button dark" onClick={verify}>Verify</button>}
        </div>
      </div>
      <Row><Agree disabled={!verified} onClick={onSolved} /></Row>
    </Stage>
  );
}
