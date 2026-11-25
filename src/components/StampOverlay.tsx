import { m } from 'framer-motion';
import { copy } from '../content/en';
import { Codey } from './Codey';
import styles from './StampOverlay.module.css';

/** Full-screen Agree/Disagree stamp with Codey's reaction underneath. */
export function StampOverlay({ kind, attempt }: { kind: 'agree' | 'disagree'; attempt: number }) {
  const lines = copy.reactions[kind];
  // Varies with each attempt but stays stable while the stamp is on screen.
  const line = lines[attempt % lines.length];
  const failed = kind === 'disagree';
  return (
    <div className={styles.overlay} data-failed={failed} role="status" aria-label={failed ? copy.game.failed : copy.game.solved}>
      <div className={styles.content}>
        <span className={styles.stamp}>{failed ? copy.game.disagree : copy.game.agree}</span>
        <m.div className={styles.reaction} initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .18, duration: .25 }}>
          <Codey mood={failed ? 'confused' : 'celebrating'} className={styles.codey} />
          <p>“{line}”</p>
        </m.div>
      </div>
    </div>
  );
}
