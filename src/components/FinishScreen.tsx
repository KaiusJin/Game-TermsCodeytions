import { useState } from 'react';
import { copy } from '../content/en';
import { formatDuration, resultGrid, shareText } from '../game/share';
import { Codey } from './Codey';
import { Icon } from './Icon';
import styles from './FinishScreen.module.css';

type FinishScreenProps = {
  practice: boolean;
  /** Disagree count per agreement in the run, in play order. */
  failures: readonly number[];
  elapsedMs: number;
  discovered: number;
  total: number;
  onNewRun: () => void;
  onHome: () => void;
};

export function FinishScreen({ practice, failures, elapsedMs, discovered, total, onNewRun, onHome }: FinishScreenProps) {
  const [copied, setCopied] = useState<'idle' | 'done' | 'failed'>('idle');
  const disagreements = failures.reduce((a, b) => a + b, 0);
  const firstTry = failures.filter(n => n === 0).length;
  const description = practice
    ? copy.finish.practiceDescription
    : copy.finish.description.replace('{n}', String(failures.length)).replace('{seen}', String(discovered)).replace('{total}', String(total));

  async function share() {
    try {
      await navigator.clipboard.writeText(shareText(failures, elapsedMs, window.location.origin));
      setCopied('done');
    } catch {
      setCopied('failed');
    }
  }

  return (
    <section className={styles.finish}>
      <div className={styles.finishArt}><span /><Codey mood="celebrating" /><span className={styles.finishStamp}><Icon name="check" size={13} />{copy.finish.stamp}</span></div>
      <span className="eyebrow">{copy.finish.eyebrow}</span>
      <h1 id="page-title" tabIndex={-1}>{practice ? copy.finish.practiceTitle : copy.finish.title}</h1>
      <p>{description}</p>
      {!practice && (
        <div className={styles.result}>
          <dl className={styles.stats}>
            <div><dt>{copy.finish.time}</dt><dd>{formatDuration(elapsedMs)}</dd></div>
            <div><dt>{copy.finish.disagreements}</dt><dd>{disagreements}</dd></div>
            <div><dt>{copy.finish.firstTry}</dt><dd>{firstTry}/{failures.length}</dd></div>
          </dl>
          <pre className={styles.grid} aria-label={copy.finish.gridLabel}>{resultGrid(failures)}</pre>
          <button className="button secondary" onClick={share}>
            <Icon name={copied === 'done' ? 'check' : 'book'} size={16} />
            {copied === 'done' ? copy.finish.copied : copied === 'failed' ? copy.finish.copyFailed : copy.finish.share}
          </button>
        </div>
      )}
      <div className={styles.finishActions}>
        <button className="button primary" onClick={onNewRun}>{copy.finish.replay}<Icon name="reset" size={17} /></button>
        <button className="button secondary" onClick={onHome}>{copy.finish.home}</button>
      </div>
    </section>
  );
}
