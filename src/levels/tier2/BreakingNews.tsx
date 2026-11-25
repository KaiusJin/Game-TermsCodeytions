import { useState } from 'react';
import type { LevelProps } from '../../game/types';
import { Stage } from '../shared/controls';
import s from './BreakingNews.module.css';

const headlines = ['DISAGREE', 'BREAKING: GOOSE CLAIMS DC LIBRARY', 'DISAGREE', 'AGREE', 'CODEY WINS NAP CHAMPIONSHIP', 'DISAGREE', 'MIDTERMS POSTPONED (NOT REALLY)'];

export function BreakingNews({ onSolved, onFailed }: LevelProps) {
  const [held, setHeld] = useState(false);
  return (
    <Stage className={s.newsStage}>
      <div className={s.anchor}><span>LIVE</span>CSC News Network</div>
      <div className={s.ticker} data-paused={held} onPointerDown={e => { if (e.pointerType !== 'mouse') setHeld(true); }}>
        <div className={s.tickerTrack}>
          {[...headlines, ...headlines].map((item, i) => item === 'AGREE' || item === 'DISAGREE'
            ? <button key={i} type="button" className={item === 'AGREE' ? s.newsAgree : s.newsNo} onClick={item === 'AGREE' ? onSolved : onFailed}>{item}</button>
            : <span key={i} className={s.headline}>{item}</span>)}
        </div>
      </div>
    </Stage>
  );
}
