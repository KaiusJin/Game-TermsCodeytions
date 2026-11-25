import { useState } from 'react';
import type { LevelProps } from '../../game/types';
import { Agree, Row, Stage } from '../shared/controls';
import s from './Backwards.module.css';

export function Backwards({ onSolved }: LevelProps) {
  const [value, setValue] = useState('');
  const shown = [...value].reverse().join('');
  const ok = shown.trim().toLowerCase() === 'i agree';
  return (
    <Stage>
      <label className={s.signLabel} htmlFor="backwards-sign">Signature</label>
      <input id="backwards-sign" className={s.signInput} value={value} onChange={e => setValue(e.target.value)} autoComplete="off" spellCheck={false} placeholder="ereh ngiS" />
      <p className={s.signPreview}>Your signature reads: <strong>{shown || '…'}</strong></p>
      <Row><Agree disabled={!ok} onClick={onSolved} /></Row>
    </Stage>
  );
}
