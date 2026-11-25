import { useState, type ReactNode } from 'react';
import { copy } from '../content/en';
import type { LevelDef } from '../game/types';
import { Codey } from './Codey';
import { Icon } from './Icon';
import styles from './AgreementFrame.module.css';

type AgreementFrameProps = {
  level: LevelDef;
  position: number;
  total: number;
  onRetry: () => void;
  children: ReactNode;
};

export function AgreementFrame({ level, position, total, onRetry, children }: AgreementFrameProps) {
  const [hint, setHint] = useState(0);
  const number = String(position).padStart(2, '0');
  return (
    <div className={styles.layout}>
      <section className={styles.document} aria-label={`Agreement ${position}: ${level.title}`}>
        <div className={styles.titlebar}>
          <span className={styles.dots}><i /><i /><i /></span>
          <span>agreement_{number}.txt</span>
          <span className={styles.tier} aria-label={`Difficulty ${level.tier} of 5`}>{[1, 2, 3, 4, 5].map(t => <i key={t} data-on={t <= level.tier} />)}</span>
        </div>
        <div className={styles.content}>
          <div className={styles.meta}><span className="eyebrow">Agreement {number}</span><span>{number} / {String(total).padStart(2, '0')}</span></div>
          <h2>{level.title}</h2>
          <ol className={styles.terms}>{level.terms.map((term, i) => <li key={i}><span>§{i + 1}</span><p>{term}</p></li>)}</ol>
          {children}
        </div>
      </section>
      <aside className={styles.aside}>
        <div className={styles.buddy}>
          <span className="eyebrow">{copy.game.buddyLabel}</span>
          <Codey className={styles.codey} />
          <p>“{level.codey}”</p>
          <span className={styles.signature}>— Codey</span>
        </div>
        <div className={styles.hintBox}>
          <button className={styles.hintButton} aria-expanded={hint > 0} aria-controls="hint-content" onClick={() => setHint(hint === 0 ? 1 : 0)}><Icon name="spark" size={18} />{copy.game.hint}<span>{hint ? '−' : '+'}</span></button>
          {hint > 0 && <div id="hint-content" className={styles.hintContent} aria-live="polite"><p>{level.hints[hint - 1]}</p>{hint === 1 && <button onClick={() => setHint(2)}>{copy.game.moreHint}<Icon name="arrow" size={15} /></button>}</div>}
        </div>
        <button className={styles.retry} onClick={onRetry}><Icon name="reset" size={15} />{copy.game.retry}</button>
      </aside>
    </div>
  );
}
