import { useRef, useState, type RefObject } from 'react';
import { AnimatePresence, m, useDragControls } from 'framer-motion';
import type { LevelProps } from '../../game/types';
import { Agree, Stage } from '../shared/controls';
import s from './WindowShopping.module.css';

type Popup = { id: number; title: string; body: string; protected?: boolean; x: number; y: number; w: number };

const popups: Popup[] = [
  { id: 1, title: 'Codey Weekly', body: 'Subscribe for 7 dog facts a day!', x: -90, y: -50, w: 220 },
  { id: 2, title: 'DO NOT CLOSE', body: 'This window keeps the agreement legally valid. Closing it voids everything.', protected: true, x: 0, y: 0, w: 260 },
  { id: 3, title: 'Rate us!', body: '★★★★★ How are we doing?', x: 80, y: 30, w: 200 },
  { id: 4, title: 'Update available', body: 'Terms v2.0.1 is ready to install.', x: -40, y: 60, w: 230 },
];

function PopupWindow({ popup, area, onClose, z }: { popup: Popup; area: RefObject<HTMLDivElement | null>; onClose: () => void; z: number }) {
  const controls = useDragControls();
  return (
    <m.div
      className={s.popup} style={{ width: popup.w, zIndex: z, x: popup.x, y: popup.y }}
      drag dragControls={controls} dragListener={false} dragConstraints={area} dragMomentum={false}
      initial={{ scale: .6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: .6, opacity: 0 }} transition={{ delay: popup.id * .06 }}
      data-protected={popup.protected ?? false}
    >
      <div className={s.popupBar} onPointerDown={e => controls.start(e)}>
        <span>{popup.title}</span>
        <button type="button" aria-label={`Close ${popup.title}`} onPointerDown={e => e.stopPropagation()} onClick={onClose}>×</button>
      </div>
      <p>{popup.body}</p>
    </m.div>
  );
}

export function WindowShopping({ onSolved, onFailed }: LevelProps) {
  const area = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(popups.map(p => p.id));
  return (
    <Stage className={s.windows}>
      <div ref={area} className={s.windowArea}>
        <Agree className={s.windowAgree} onClick={onSolved} />
        <AnimatePresence>
          {popups.filter(p => open.includes(p.id)).map((p, i) => (
            <PopupWindow key={p.id} popup={p} area={area} z={i + 2} onClose={() => (p.protected ? onFailed() : setOpen(open.filter(id => id !== p.id)))} />
          ))}
        </AnimatePresence>
      </div>
    </Stage>
  );
}
