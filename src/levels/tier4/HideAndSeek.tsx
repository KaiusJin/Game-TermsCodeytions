import { useState, type ReactNode } from 'react';
import type { LevelProps } from '../../game/types';
import { asset } from '../../assets';
import { Agree, Row, Stage } from '../shared/controls';
import { Goose } from '../shared/art';
import s from './HideAndSeek.module.css';

const codey = asset('codey/codey_sitting.svg');

// Codey hides in tiles 1, 3, 4, 6, 8 and 9 (ears, peeking over snow, mug, reflection, constellation, box). Tile 2's plush has no glasses, so it isn't Codey.
const scenes: { codey: boolean; scene: ReactNode }[] = [
  { codey: true, scene: <div className={s.shelf}><img src={codey} alt="" className={s.shelfCodey} /><div className={s.books}>{['#b55252', '#2867d8', '#7c9a5e', '#c58b4a', '#8064a2', '#4a8a8a'].map(c => <i key={c} style={{ background: c }} />)}</div></div> },
  { codey: false, scene: <div className={s.couch}><svg viewBox="0 0 100 100" className={s.plush} aria-hidden="true"><path d="M30 30 22 8 42 22Z M70 30 78 8 58 22Z" fill="#6aa7f0" stroke="#1d2f52" strokeWidth="3" /><circle cx="50" cy="44" r="24" fill="#6aa7f0" stroke="#1d2f52" strokeWidth="3" /><ellipse cx="50" cy="80" rx="28" ry="18" fill="#6aa7f0" stroke="#1d2f52" strokeWidth="3" /><circle cx="42" cy="42" r="3" fill="#1d2f52" /><circle cx="58" cy="42" r="3" fill="#1d2f52" /><ellipse cx="50" cy="52" rx="5" ry="3.5" fill="#1d2f52" /></svg><span className={s.cushion} /></div> },
  { codey: true, scene: <div className={s.snow}><img src={codey} alt="" className={s.snowCodey} /><span className={s.mound} /></div> },
  { codey: true, scene: <div className={s.cafe}><span className={s.mug}><img src={codey} alt="" /></span><span className={s.steam} /></div> },
  { codey: false, scene: <div className={s.field}><Goose size={54} /><Goose size={46} className={s.flip} /><Goose size={40} /></div> },
  { codey: true, scene: <div className={s.window}><img src={codey} alt="" className={s.reflection} /><span className={s.frame} /></div> },
  { codey: false, scene: <div className={s.board}><svg viewBox="0 0 100 80" className={s.fox} aria-hidden="true"><path d="M30 30 24 8 40 22 60 22 76 8 70 30 C74 46 62 58 50 60 C38 58 26 46 30 30Z M40 36h2M58 36h2M47 46 50 49 53 46 M50 60 C40 70 20 72 10 66 C24 64 30 58 34 54" fill="none" stroke="#f3f6ef" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg></div> },
  { codey: true, scene: <div className={s.sky}>{Array.from({ length: 14 }, (_, i) => <i key={i} style={{ left: `${(i * 41) % 95}%`, top: `${(i * 29) % 90}%` }} />)}<img src={codey} alt="" className={s.constellation} /></div> },
  { codey: true, scene: <div className={s.box}><span className={s.hole}><img src={codey} alt="" /></span><span className={s.flap} /></div> },
];

export function HideAndSeek({ onSolved, onFailed }: LevelProps) {
  const [picked, setPicked] = useState<number[]>([]);
  const [verified, setVerified] = useState(false);
  function verify() {
    const wanted = scenes.flatMap((t, i) => (t.codey ? [i] : []));
    if (wanted.length === picked.length && wanted.every(i => picked.includes(i))) setVerified(true);
    else onFailed();
  }
  return (
    <Stage>
      <div className={s.captcha}>
        <div className={s.head}><small>Select all images with</small><strong>Codey</strong><small>Click verify once there are none left</small></div>
        <div className={s.grid}>
          {scenes.map((t, i) => (
            <button key={i} type="button" className={s.tile} aria-label={`Tile ${i + 1}`} aria-pressed={picked.includes(i)} disabled={verified}
              onClick={() => setPicked(picked.includes(i) ? picked.filter(p => p !== i) : [...picked, i])}>{t.scene}</button>
          ))}
        </div>
        <div className={s.foot}>{verified ? <span className={s.ok}>✓ Verified human</span> : <button type="button" className="button primary" onClick={verify}>Verify</button>}</div>
      </div>
      <Row><Agree disabled={!verified} onClick={onSolved} /></Row>
    </Stage>
  );
}
