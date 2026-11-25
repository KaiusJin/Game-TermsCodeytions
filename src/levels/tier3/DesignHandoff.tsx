import { useState } from 'react';
import type { LevelProps } from '../../game/types';
import { Agree, Disagree, Stage } from '../shared/controls';
import s from './DesignHandoff.module.css';

type Layer = { id: 'agree' | 'disagree' | 'bg'; name: string; visible: boolean; locked: boolean };

// Listed top-most first, like a real layers panel.
const initialLayers: Layer[] = [
  { id: 'disagree', name: 'Disagree button', visible: true, locked: false },
  { id: 'agree', name: 'Agree button', visible: false, locked: true },
  { id: 'bg', name: 'Background', visible: true, locked: true },
];

export function DesignHandoff({ onSolved, onFailed }: LevelProps) {
  const [layers, setLayers] = useState(initialLayers);
  const update = (id: Layer['id'], patch: Partial<Layer>) => setLayers(layers.map(l => (l.id === id ? { ...l, ...patch } : l)));
  function raise(index: number) {
    const next = [...layers];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    setLayers(next);
  }

  return (
    <Stage className={s.app}>
      <div className={s.canvas}>
        {[...layers].reverse().map(layer => {
          if (!layer.visible) return null;
          const z = layers.length - layers.indexOf(layer);
          const blocked = { zIndex: z, pointerEvents: layer.locked ? 'none' : 'auto' } as const;
          if (layer.id === 'bg') return <div key="bg" className={s.bg} style={{ zIndex: z }} />;
          return layer.id === 'agree'
            ? <Agree key="agree" className={s.onCanvas} style={blocked} tabIndex={layer.locked ? -1 : 0} onClick={onSolved} />
            : <Disagree key="disagree" className={s.onCanvas} style={blocked} tabIndex={layer.locked ? -1 : 0} onClick={onFailed} />;
        })}
      </div>
      <aside className={s.panel} aria-label="Layers">
        <span className={s.panelTitle}>Layers</span>
        {layers.map((layer, i) => (
          <div key={layer.id} className={s.layer} data-hidden={!layer.visible}>
            <span className={s.name}>{layer.name}</span>
            <button type="button" aria-label={`${layer.visible ? 'Hide' : 'Show'} ${layer.name}`} onClick={() => update(layer.id, { visible: !layer.visible })}>{layer.visible ? '👁' : '◌'}</button>
            <button type="button" aria-label={`${layer.locked ? 'Unlock' : 'Lock'} ${layer.name}`} onClick={() => update(layer.id, { locked: !layer.locked })}>{layer.locked ? '🔒' : '🔓'}</button>
            <button type="button" aria-label={`Bring ${layer.name} forward`} disabled={i === 0} onClick={() => raise(i)}>↑</button>
          </div>
        ))}
      </aside>
    </Stage>
  );
}
