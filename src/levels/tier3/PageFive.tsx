import { useState } from 'react';
import type { LevelProps } from '../../game/types';
import { Agree, Stage } from '../shared/controls';
import s from './PageFive.module.css';

const pageText = ['Welcome to the terms.', 'Clauses 1–40: about geese.', 'Clauses 41–80: about Codey’s naps.', 'Clauses 81–99: about this paywall.'];

export function PageFive({ onSolved }: LevelProps) {
  const [page, setPage] = useState(1);
  const [url, setUrl] = useState('csc.uwaterloo.ca/terms?page=1');
  function go(p: number) { setPage(p); setUrl(`csc.uwaterloo.ca/terms?page=${p}`); }
  return (
    <Stage className={s.browserStage}>
      <div className={s.browser}>
        <div className={s.addressBar}>
          <span aria-hidden="true">🔒</span>
          <input aria-label="Address bar" value={url} onChange={e => setUrl(e.target.value)} onKeyDown={e => {
            if (e.key !== 'Enter') return;
            const n = Number(/page=(\d+)/.exec(url)?.[1]);
            if (n >= 1 && n <= 5) setPage(n); else setUrl(`csc.uwaterloo.ca/terms?page=${page}`);
          }} spellCheck={false} autoComplete="off" />
        </div>
        <div className={s.page}>
          <span className="eyebrow">Page {page} of 5</span>
          {page < 5 ? <p>{pageText[page - 1]}</p> : <><p>You found page 5. Codey is impressed.</p><Agree onClick={onSolved} /></>}
          {page === 4 && <p className={s.paywall}>🔒 Page 5 requires CSC Premium™ ($49.99/term)</p>}
          {page < 5 && <div className={s.pager}><button type="button" className="button secondary" disabled={page === 1} onClick={() => go(page - 1)}>← Prev</button><button type="button" className="button secondary" disabled={page >= 4} onClick={() => go(page + 1)}>Next →</button></div>}
        </div>
      </div>
    </Stage>
  );
}
