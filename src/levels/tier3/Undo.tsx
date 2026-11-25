import { useEffect, useState } from 'react';
import type { LevelProps } from '../../game/types';
import { Agree, Stage } from '../shared/controls';
import s from './Undo.module.css';

export function Undo({ onSolved }: LevelProps) {
  const [undone, setUndone] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  useEffect(() => {
    function onKey(e: globalThis.KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z') { e.preventDefault(); setUndone(true); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  const menus: Record<string, { label: string; action?: () => void; hint?: string }[]> = {
    File: [{ label: 'New agreement' }, { label: 'Print' }],
    Edit: [{ label: 'Undo Disagree', hint: '⌘Z', action: () => setUndone(true) }, { label: 'Redo' }],
    Help: [{ label: 'About Codey' }],
  };
  return (
    <Stage className={s.undoStage}>
      <div className={s.menubar}>
        {Object.keys(menus).map(name => (
          <div key={name} className={s.menuWrap}>
            <button type="button" aria-expanded={menu === name} onClick={() => setMenu(menu === name ? null : name)}>{name}</button>
            {menu === name && (
              <div className={s.menu} role="menu">
                {menus[name].map(item => (
                  <button key={item.label} type="button" role="menuitem" disabled={!item.action || (undone && item.label.startsWith('Undo'))} onClick={() => { item.action?.(); setMenu(null); }}>
                    {item.label}{item.hint && <kbd>{item.hint}</kbd>}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={s.undoBody} onClick={() => setMenu(null)}>
        {undone
          ? <><p className={s.undoOk}>↶ Disagree undone. Clean slate!</p><Agree onClick={onSolved} /></>
          : <><p className={s.undoBad}>✗ You disagreed.</p><p className={s.muted}>This decision is final and cannot be undone.</p><Agree disabled>Agree</Agree></>}
      </div>
    </Stage>
  );
}
