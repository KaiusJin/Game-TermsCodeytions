import { copy } from '../content/en';
import { Codey } from './Codey';
import { Icon } from './Icon';
import styles from './FinishScreen.module.css';

type FinishScreenProps = {
  practice: boolean;
  runLength: number;
  discovered: number;
  total: number;
  onNewRun: () => void;
  onHome: () => void;
};

export function FinishScreen({ practice, runLength, discovered, total, onNewRun, onHome }: FinishScreenProps) {
  const description = practice
    ? copy.finish.practiceDescription
    : copy.finish.description.replace('{n}', String(runLength)).replace('{seen}', String(discovered)).replace('{total}', String(total));
  return (
    <section className={styles.finish}>
      <div className={styles.finishArt}><span /><Codey celebrating /><span className={styles.finishStamp}><Icon name="check" size={13} />{copy.finish.stamp}</span></div>
      <span className="eyebrow">{copy.finish.eyebrow}</span>
      <h1 id="page-title" tabIndex={-1}>{practice ? copy.finish.practiceTitle : copy.finish.title}</h1>
      <p>{description}</p>
      <div className={styles.finishActions}>
        <button className="button primary" onClick={onNewRun}>{copy.finish.replay}<Icon name="reset" size={17} /></button>
        <button className="button secondary" onClick={onHome}>{copy.finish.home}</button>
      </div>
    </section>
  );
}
