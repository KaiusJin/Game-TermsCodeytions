import { copy } from '../content/en';
import styles from './HowToPlay.module.css';

export function HowToPlay() {
  return (
    <>
      <p>{copy.dialogs.howIntro}</p>
      <ol className={styles.instructions}>{copy.steps.map(step => <li key={step.title}><strong>{step.title}</strong><p>{step.text}</p></li>)}</ol>
      <p className={styles.dialogNote}>{copy.dialogs.howNote}</p>
    </>
  );
}
