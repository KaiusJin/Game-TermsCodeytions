import { useState } from 'react';
import { levelById, levels } from '../../game/levels';
import { defaultSeconds } from '../../game/state';
import styles from './AnswerKey.module.css';

export function AnswerKey({ currentId, onPlay, onClose }: { currentId: string | null; onPlay: (id: string) => void; onClose: () => void }) {
  const [showAll, setShowAll] = useState(false);
  const current = currentId ? levelById(currentId) : undefined;
  return (
    <aside className={styles.panel} aria-label="Answer key (playtesting)">
      <div className={styles.head}>
        <span>§ Legal counsel <small>(answer key)</small></span>
        <button type="button" onClick={onClose} aria-label="Hide answer key">×</button>
      </div>
      {current ? (
        <div className={styles.current}>
          <small>{current.id} · tier {current.tier} · {current.seconds ?? defaultSeconds}s</small>
          <strong>{current.title}</strong>
          <p>{current.answer}</p>
        </div>
      ) : <p className={styles.idle}>Start a run to see the current answer here.</p>}
      <button type="button" className={styles.toggle} onClick={() => setShowAll(!showAll)}>{showAll ? '▾' : '▸'} All {levels.length} agreements (click to practise)</button>
      {showAll && (
        <ol className={styles.list}>
          {levels.map(level => (
            <li key={level.id} data-current={level.id === currentId}>
              <button type="button" onClick={() => onPlay(level.id)} title={level.answer}>
                <span className={styles.tier}>T{level.tier}</span>
                <span><b>{level.title}</b><em>{level.answer}</em></span>
              </button>
            </li>
          ))}
        </ol>
      )}
    </aside>
  );
}
