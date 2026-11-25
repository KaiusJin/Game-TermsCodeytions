import { useState, type ReactNode } from 'react';
import type { LevelProps } from '../../game/types';
import { asset } from '../../assets';
import { Agree, Row, Stage } from '../shared/controls';
import s from './SpotTheDifference.module.css';

type Diff = 'title' | 'codey' | 'seal';

function Sheet({ copy, found, onFind }: { copy: boolean; found: Diff[]; onFind: (d: Diff) => void }) {
  const spot = (d: Diff, content: ReactNode) => (copy
    ? <button type="button" className={s.spot} data-found={found.includes(d)} aria-label="Suspicious detail" onClick={() => onFind(d)}>{content}</button>
    : content);
  return (
    <div className={s.sheet}>
      <span className={s.tag}>{copy ? 'Copy' : 'Original'}</span>
      {spot('title', <strong className={s.title}>{copy ? 'Terms of Servise' : 'Terms of Service'}</strong>)}
      <div className={s.lines}><i /><i /><i /></div>
      <div className={s.bottom}>
        {spot('codey', <img src={asset('codey/codey_sitting.svg')} alt="" className={s.codey} style={copy ? { transform: 'scaleX(-1)' } : undefined} />)}
        {spot('seal', <span className={s.seal} data-red={copy}>CSC</span>)}
      </div>
    </div>
  );
}

export function SpotTheDifference({ onSolved }: LevelProps) {
  const [found, setFound] = useState<Diff[]>([]);
  const find = (d: Diff) => { if (!found.includes(d)) setFound([...found, d]); };
  return (
    <Stage>
      <div className={s.pair}>
        <Sheet copy={false} found={found} onFind={find} />
        <Sheet copy found={found} onFind={find} />
      </div>
      <p className={s.count}>{found.length} / 3 differences found</p>
      <Row><Agree disabled={found.length < 3} onClick={onSolved} /></Row>
    </Stage>
  );
}
