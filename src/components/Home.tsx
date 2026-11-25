import { copy } from '../content/en';
import { Codey } from './Codey';
import { Icon } from './Icon';
import styles from './Home.module.css';

export function Home({ completed, onStart, onHow }: { completed: boolean; onStart: () => void; onHow: () => void }) {
  return (
    <>
      <section className={styles.hero} aria-labelledby="page-title">
        <div className={styles.intro}>
          <div className={styles.kicker}><span />{copy.hero.eyebrow}</div>
          <h1 id="page-title" tabIndex={-1}>Terms <span className={styles.amp}>&</span><br /><span className={styles.blue}>Codeytions<span className={styles.dot}>.</span></span></h1>
          <p className={styles.tagline}>{copy.hero.tagline}</p>
          <p className={styles.description}>{copy.hero.description}</p>
          <div className={styles.actions}>
            <button className="button primary" onClick={onStart}>{completed ? copy.hero.replay : copy.hero.start}<Icon name="arrow" /></button>
            <button className={styles.how} onClick={onHow}>{copy.nav.how}<span>↗</span></button>
          </div>
          <p className={styles.note}><Icon name="check" size={15} />{copy.hero.note}</p>
        </div>
        <div className={styles.illustration} aria-hidden="true">
          <div className={styles.orbit} />
          <div className={styles.tinyStar}><Icon name="spark" size={38} /></div>
          <div className={styles.paperBack} />
          <div className={styles.paper}>
            <div className={styles.titlebar}><span className={styles.dots}><i /><i /><i /></span><span>agreement_001.txt</span><span>↗</span></div>
            <div className={styles.paperContent}>
              <span className={styles.fileIcon}><Icon name="book" size={25} /></span>
              <span className={styles.paperLabel}>{copy.hero.label}</span>
              <h2>{copy.hero.documentTitle}</h2>
              <p>{copy.hero.documentText}</p>
              <div className={styles.textLines}><i /><i /></div>
              <div className={styles.checkbox}><span><Icon name="check" size={12} /></span>{copy.hero.documentCheck}</div>
              <div className={styles.fakeButton}>{copy.game.agree}<Icon name="arrow" size={18} /></div>
              <small>{copy.hero.footnote}</small>
            </div>
          </div>
          <div className={styles.sticker}>{copy.hero.sticker}<span>✳</span></div>
          <div className={styles.codey}><Codey /></div>
          <div className={styles.codeyLabel}>Codey, legal-ish advisor <span>↗</span></div>
        </div>
      </section>
      <section className={styles.steps} aria-label={copy.nav.how}>
        {copy.steps.map((step, index) => (
          <div className={styles.step} key={step.title}>
            <span className={styles.stepNumber}>0{index + 1}</span>
            <div><h2>{step.title}</h2><p>{step.text}</p></div>
          </div>
        ))}
      </section>
    </>
  );
}
