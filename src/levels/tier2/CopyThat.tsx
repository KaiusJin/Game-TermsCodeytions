import { useState } from 'react';
import type { LevelProps } from '../../game/types';
import { Agree, Row, Stage } from '../shared/controls';
import s from './CopyThat.module.css';

const consentCode = 'CSC-4GR33-7H3-73RM5-0F-C0D3Y-W00F-2026';

export function CopyThat({ onSolved }: LevelProps) {
  const [value, setValue] = useState('');
  const [copied, setCopied] = useState(false);
  async function copy() {
    try { await navigator.clipboard.writeText(consentCode); setCopied(true); } catch { setCopied(false); }
  }
  return (
    <Stage>
      <div className={s.codeBox}>
        <code>{consentCode}</code>
        <button type="button" className={s.copy} onClick={copy} aria-label="Copy consent code">{copied ? '✓ Copied' : '⧉ Copy'}</button>
      </div>
      <label className={s.label} htmlFor="consent-code">Your consent code</label>
      <input id="consent-code" className={s.input} value={value} onChange={e => setValue(e.target.value)} autoComplete="off" spellCheck={false} placeholder="Paste here" />
      <Row><Agree disabled={value.trim() !== consentCode} onClick={onSolved} /></Row>
    </Stage>
  );
}
