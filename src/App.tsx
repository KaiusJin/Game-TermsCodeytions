import { Suspense, useEffect, useMemo, useReducer, useState } from 'react';
import { m } from 'framer-motion';
import { asset } from './assets';
import { copy } from './content/en';
import { currentLevelId, defaultSeconds, gameReducer, loadProgress, saveProgress } from './game/state';
import { levelById, levels, preloadLevels } from './game/levels';
import { pickRun } from './game/run';
import { AgreementFrame } from './components/AgreementFrame';
import { AnswerKey } from './components/answerKey/AnswerKey';
import { useAnswerKey } from './components/answerKey/useAnswerKey';
import { Collection } from './components/Collection';
import { Dialog } from './components/Dialog';
import { FinishScreen } from './components/FinishScreen';
import { GameToolbar } from './components/GameToolbar';
import { Home } from './components/Home';
import { HowToPlay } from './components/HowToPlay';
import { Icon } from './components/Icon';
import { StampOverlay } from './components/StampOverlay';
import { playStamp } from './sound/sfx';
import { useSoundSetting } from './sound/useSoundSetting';
import styles from './App.module.css';

export default function App() {
  const [game, dispatch] = useReducer(gameReducer, undefined, loadProgress);
  const [dialog, setDialog] = useState<'how' | 'levels' | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(defaultSeconds);
  const [storageError, setStorageError] = useState(false);
  const answerKey = useAnswerKey();
  const [soundOn, setSoundOn] = useSoundSetting();
  const isGame = game.screen === 'playing' || game.screen === 'solved' || game.screen === 'failed';
  const levelId = currentLevelId(game);
  const activeLevel = levelById(levelId) ?? levels[0];
  const Level = activeLevel.Component;

  useEffect(() => {
    document.getElementById('page-title')?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [game.screen, game.index]);

  useEffect(() => {
    if (game.screen !== 'playing') return;
    function tick() {
      const remaining = Math.max(0, game.deadline - Date.now());
      setSecondsLeft(remaining / 1000);
      if (remaining === 0) dispatch({ type: 'fail', attempt: game.attempt });
    }
    tick();
    const timer = window.setInterval(tick, 100);
    return () => window.clearInterval(timer);
  }, [game.screen, game.attempt, game.deadline]);

  useEffect(() => {
    if (game.screen !== 'solved' && game.screen !== 'failed') return;
    const timer = window.setTimeout(() => {
      if (game.screen === 'solved') {
        const finishingRun = game.index === game.run.length - 1 && !game.practice;
        setStorageError(!saveProgress(game.completed || finishingRun, game.completedLevels));
      }
      dispatch({ type: game.screen === 'solved' ? 'continue' : 'retry', attempt: game.attempt, now: Date.now() });
    }, 1400);
    return () => window.clearTimeout(timer);
  }, [game.screen, game.attempt, game.completed, game.completedLevels, game.index, game.run.length, game.practice]);

  useEffect(() => {
    if (soundOn && (game.screen === 'solved' || game.screen === 'failed')) playStamp(game.screen === 'solved' ? 'agree' : 'disagree');
  }, [game.screen, game.attempt, soundOn]);

  // Bound to the attempt and stable across timer ticks, so level effects that depend on them don't restart.
  const levelHandlers = useMemo(() => ({
    onSolved: () => dispatch({ type: 'solve', attempt: game.attempt, now: Date.now() }),
    onFailed: () => dispatch({ type: 'fail', attempt: game.attempt }),
  }), [game.attempt]);

  function startRun() {
    setDialog(null);
    const run = pickRun();
    preloadLevels(run);
    dispatch({ type: 'start', run, now: Date.now() });
  }
  function practise(id: string) {
    setDialog(null);
    preloadLevels([id]);
    dispatch({ type: 'start', run: [id], now: Date.now(), practice: true });
  }
  const goHome = () => dispatch({ type: 'home' });

  return (
    <div className={styles.app}>
      <a className="skipLink" href="#main">Skip to content</a>
      <header className={styles.header}>
        <button className={styles.brand} onClick={goHome} aria-label={`${copy.title} — ${copy.nav.home}`}>
          <span className={styles.logoChip}><img src={asset('brand/logo-icon.svg')} alt="" width="56" height="24" /></span>
          <span className={styles.club}><strong>{copy.club}</strong><span>{copy.university}</span></span>
        </button>
        <nav aria-label="Main navigation">
          <button className={styles.iconButton} onClick={() => setSoundOn(!soundOn)} aria-pressed={soundOn} aria-label={soundOn ? copy.sound.on : copy.sound.off} title={soundOn ? copy.sound.on : copy.sound.off}><Icon name={soundOn ? 'sound' : 'mute'} size={18} /></button>
          <button className={styles.navButton} onClick={() => setDialog('how')}>{copy.nav.how}</button>
          <button className={styles.navOutline} onClick={() => setDialog('levels')}><Icon name="grid" size={15} />{copy.nav.levels}<span className={styles.navCount}>{game.completedLevels.length}/{levels.length}</span></button>
        </nav>
      </header>

      <main id="main" className={styles.main}>
        <m.div key={isGame ? 'game' : game.screen} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .22 }}>
          {game.screen === 'home' && <Home completed={game.completed} onStart={startRun} onHow={() => setDialog('how')} />}
          {isGame && <section className={styles.game} id="page-title" tabIndex={-1} aria-label={`Agreement ${game.index + 1}`}>
            <GameToolbar runLength={game.run.length} index={game.index} secondsLeft={secondsLeft} totalSeconds={activeLevel.seconds ?? defaultSeconds} running={game.screen === 'playing'} onHome={goHome} />
            <div inert={game.screen !== 'playing'}>
              <AgreementFrame key={`${levelId}-${game.attempt}`} level={activeLevel} position={game.index + 1} total={game.run.length} onRetry={() => dispatch({ type: 'retry', attempt: game.attempt, now: Date.now() })}>
                <Suspense fallback={<p className={styles.loading}>{copy.game.loading}</p>}><Level {...levelHandlers} /></Suspense>
              </AgreementFrame>
            </div>
            {(game.screen === 'solved' || game.screen === 'failed') && <StampOverlay kind={game.screen === 'solved' ? 'agree' : 'disagree'} attempt={game.attempt} />}
          </section>}
          {game.screen === 'finished' && <FinishScreen practice={game.practice} failures={game.failures} elapsedMs={game.finishedAt - game.startedAt} discovered={game.completedLevels.length} total={levels.length} onNewRun={startRun} onHome={goHome} />}
        </m.div>
        {storageError && <p className={styles.storageError} role="status">{copy.storageError}</p>}
      </main>

      <footer className={styles.footer}>
        <span><button type="button" className={styles.footerSpark} onClick={answerKey.tapSecret} aria-hidden="true" tabIndex={-1}>✳</button>{copy.footer.left}</span>
        <span>{copy.footer.right}<Icon name="spark" size={13} /></span>
      </footer>

      {answerKey.open && <AnswerKey currentId={isGame ? levelId : null} onPlay={practise} onClose={answerKey.close} />}

      {dialog && <Dialog title={dialog === 'how' ? copy.dialogs.howTitle : copy.dialogs.levelsTitle} onClose={() => setDialog(null)}>
        {dialog === 'how' ? <HowToPlay /> : <Collection completedLevels={game.completedLevels} onNewRun={startRun} />}
      </Dialog>}
    </div>
  );
}
