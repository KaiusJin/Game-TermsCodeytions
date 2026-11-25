import type { LevelProps } from '../../game/types';
import { Stage } from '../shared/controls';
import s from './Highlight.module.css';

export function Highlight({ onSolved }: LevelProps) {
  return (
    <Stage className={s.highlight}>
      <p><b>§7.1</b> The user agrees that not everything is as it appears on paper.</p>
      <p className={s.gap}>
        <span role="button" tabIndex={0} className={s.hidden} onClick={onSolved} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSolved(); } }}>→ I agree to all of the above ←</span>
      </p>
      <p><b>§7.2</b> The blank space above is not blank. It is merely shy.</p>
    </Stage>
  );
}
