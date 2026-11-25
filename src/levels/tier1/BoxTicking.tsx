import { useState } from 'react';
import type { LevelProps } from '../../game/types';
import { Agree, Row, Stage } from '../shared/controls';
import s from './BoxTicking.module.css';

export function BoxTicking({ onSolved }: LevelProps) {
  const [boxes, setBoxes] = useState({ read: false, actually: false, spam: true, goose: false });
  const rows: { key: keyof typeof boxes; label: string; required: boolean }[] = [
    { key: 'read', label: 'I have read the Terms & Codeytions.', required: true },
    { key: 'actually', label: 'I have actually read the Terms & Codeytions.', required: true },
    { key: 'spam', label: 'Send me 14 CSC newsletters per day. (optional)', required: false },
    { key: 'goose', label: 'I am not a goose.', required: true },
  ];
  const ready = boxes.read && boxes.actually && boxes.goose && !boxes.spam;
  return (
    <Stage>
      <div className={s.boxes}>
        {rows.map(row => (
          <label key={row.key} className={s.box}>
            <input type="checkbox" checked={boxes[row.key]} onChange={e => setBoxes({ ...boxes, [row.key]: e.target.checked })} />
            <span className={s.tick} aria-hidden="true">✓</span>
            <span>{row.label}{row.required && <em> *required</em>}</span>
          </label>
        ))}
      </div>
      <Row><Agree disabled={!ready} onClick={onSolved} /></Row>
    </Stage>
  );
}
