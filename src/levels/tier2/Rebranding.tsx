import { useEffect, useRef, useState } from 'react';
import type { LevelProps } from '../../game/types';
import { Stage } from '../shared/controls';
import s from './Rebranding.module.css';

export function Rebranding({ onSolved, onFailed }: LevelProps) {
  const [label, setLabel] = useState('Disagree');
  const [editing, setEditing] = useState(false);
  const clickTimer = useRef(0);
  useEffect(() => () => window.clearTimeout(clickTimer.current), []);

  function press() {
    if (label === 'Agree') onSolved();
    else if (label === 'Disagree') onFailed();
  }
  function commit(value: string) {
    setLabel(value.trim() || label);
    setEditing(false);
  }

  return (
    <Stage className={s.stage}>
      {editing ? (
        <input className={s.edit} defaultValue={label} autoFocus aria-label="Rename button"
          onFocus={e => e.currentTarget.select()}
          onKeyDown={e => { if (e.key === 'Enter') commit(e.currentTarget.value); if (e.key === 'Escape') setEditing(false); }}
          onBlur={e => commit(e.currentTarget.value)} />
      ) : (
        <button type="button" className={`button ${label === 'Agree' ? 'primary' : 'secondary'} ${s.button}`}
          // A double-click renames, so a single click only counts once we know it wasn't the first half of one.
          onClick={e => { if (e.detail <= 1) clickTimer.current = window.setTimeout(press, e.detail === 0 ? 0 : 260); }}
          onDoubleClick={() => { window.clearTimeout(clickTimer.current); setEditing(true); }}
          onKeyDown={e => { if (e.key === 'F2') { e.preventDefault(); setEditing(true); } }}>
          {label}
        </button>
      )}
      <small className={s.owner}>owner: you</small>
    </Stage>
  );
}
