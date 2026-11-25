import { copy } from '../content/en';
import { Icon } from './Icon';
import styles from './GameToolbar.module.css';

type GameToolbarProps = {
  runLength: number;
  index: number;
  secondsLeft: number;
  totalSeconds: number;
  running: boolean;
  onHome: () => void;
};

export function GameToolbar({ runLength, index, secondsLeft, totalSeconds, running, onHome }: GameToolbarProps) {
  return (
    <div className={styles.gameToolbar}>
      <button className={styles.back} onClick={onHome}><Icon name="back" size={16} />{copy.nav.home}</button>
      <div className={styles.progress} aria-hidden="true">
        {Array.from({ length: runLength }, (_, i) => <i key={i} data-state={i < index ? 'done' : i === index ? 'now' : 'todo'} />)}
      </div>
      <div className={styles.timer} data-urgent={secondsLeft <= 5}>
        <strong role="timer" aria-label={copy.game.timeLeft}>{Math.ceil(secondsLeft)}s</strong>
        <span><i style={{ transform: `scaleX(${running ? secondsLeft / totalSeconds : 0})` }} /></span>
      </div>
    </div>
  );
}
