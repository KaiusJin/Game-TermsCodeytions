import { useState } from 'react';
import { m } from 'framer-motion';
import type { LevelProps } from '../../game/types';
import { Agree, Stage } from '../shared/controls';
import s from './CampusMap.module.css';

const buildings = [
  { code: 'MC', left: 18, top: 24, w: 22, h: 22 },
  { code: 'DC', left: 46, top: 18, w: 24, h: 20 },
  { code: 'SLC', left: 72, top: 52, w: 18, h: 18 },
  { code: 'E7', left: 22, top: 62, w: 16, h: 22 },
  { code: 'QNC', left: 48, top: 58, w: 16, h: 16 },
  { code: 'PAC', left: 76, top: 16, w: 16, h: 24 },
];
const rooms = ['1301', '1302', '1304', '1331', '1350', '1351'];

export function CampusMap({ onSolved }: LevelProps) {
  const [building, setBuilding] = useState<string | null>(null);
  const [room, setRoom] = useState<string | null>(null);
  const [note, setNote] = useState('');

  if (building === 'DC') {
    return (
      <Stage className={s.stage}>
        <div className={s.floor}>
          <div className={s.floorHead}><button type="button" onClick={() => { setBuilding(null); setRoom(null); }}>← Map</button><strong>Davis Centre · Floor 1</strong></div>
          <div className={s.rooms}>
            {rooms.map(r => (
              <button key={r} type="button" className={s.room} data-open={room === r} onClick={() => setRoom(r)}>
                {r}
                {room === r && r !== '1350' && <small>Locked</small>}
              </button>
            ))}
          </div>
          {room === '1350' && <m.div className={s.door} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}><span>Office hours in progress</span><Agree onClick={onSolved} /></m.div>}
        </div>
      </Stage>
    );
  }

  return (
    <Stage className={s.stage}>
      <div className={s.map}>
        <span className={s.ring} aria-hidden="true">Ring Road</span>
        {buildings.map(b => (
          <button key={b.code} type="button" className={s.building} style={{ left: `${b.left}%`, top: `${b.top}%`, width: `${b.w}%`, height: `${b.h}%` }}
            onClick={() => (b.code === 'DC' ? setBuilding('DC') : setNote(`No office hours in ${b.code} today.`))}>{b.code}</button>
        ))}
        {note && <p className={s.note} role="status">{note}</p>}
      </div>
    </Stage>
  );
}
