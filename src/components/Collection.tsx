import { copy } from '../content/en';
import { levels } from '../game/levels';
import { runLength } from '../game/state';
import { Icon } from './Icon';
import styles from './Collection.module.css';

/** Which agreements the player has signed so far; unsigned ones stay a mystery. */
export function Collection({ completedLevels, onNewRun }: { completedLevels: string[]; onNewRun: () => void }) {
  return (
    <>
      <p>{copy.dialogs.levelsIntro.replace('{total}', String(levels.length)).replace('{n}', String(runLength))}</p>
      <div className={styles.collection}>
        {levels.map(level => {
          const seen = completedLevels.includes(level.id);
          return <span key={level.id} data-seen={seen} title={seen ? level.title : '???'}>{seen ? level.title : '? ? ?'}</span>;
        })}
      </div>
      <div className={styles.actions}><button className="button primary" onClick={onNewRun}>{copy.dialogs.newRun}<Icon name="arrow" size={17} /></button></div>
    </>
  );
}
