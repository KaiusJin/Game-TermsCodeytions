import { useState } from 'react';
import type { LevelProps } from '../../game/types';
import { Agree, Stage } from '../shared/controls';
import s from './Cookies.module.css';

const cookieMain = ['Analytics', 'Marketing', 'Personalisation'];

const cookieHidden = ['Goose tracking', 'Codey’s snack analytics', 'Vibes measurement'];

export function Cookies({ onSolved, onFailed }: LevelProps) {
  const [phase, setPhase] = useState<'banner' | 'manage' | 'done'>('banner');
  const [on, setOn] = useState<string[]>([...cookieMain, ...cookieHidden]);
  const toggle = (name: string) => setOn(on.includes(name) ? on.filter(n => n !== name) : [...on, name]);
  const row = (name: string) => (
    <label key={name} className={s.toggleRow}>
      <span>{name}</span>
      <input type="checkbox" role="switch" checked={on.includes(name)} onChange={() => toggle(name)} />
      <i aria-hidden="true" />
    </label>
  );
  if (phase === 'done') return <Stage className={s.cookieDone}><p>Preferences saved. Now, about those terms…</p><Agree onClick={onSolved} /></Stage>;
  return (
    <Stage className={s.cookieStage}>
      {phase === 'banner' ? (
        <div className={s.cookieBanner}>
          <span className={s.cookieIcon} aria-hidden="true">🍪</span>
          <h3>We value your privacy</h3>
          <p>We and our 412 partners use cookies to personalise your agreement experience.</p>
          <button type="button" className={`button primary ${s.acceptAll}`} onClick={onFailed}>Accept all cookies</button>
          <button type="button" className={s.manage} onClick={() => setPhase('manage')}>Manage choices</button>
        </div>
      ) : (
        <div className={s.cookieBanner}>
          <h3>Cookie preferences</h3>
          <label className={s.toggleRow} data-locked="true"><span>Strictly necessary</span><input type="checkbox" role="switch" checked disabled /><i aria-hidden="true" /></label>
          {cookieMain.map(row)}
          <div className={s.legit}>
            <p>…</p><p>…</p>
            <strong>Legitimate interest (412 partners)</strong>
            {cookieHidden.map(row)}
          </div>
          <button type="button" className="button dark" disabled={on.length > 0} onClick={() => setPhase('done')}>Save my choices</button>
        </div>
      )}
    </Stage>
  );
}
