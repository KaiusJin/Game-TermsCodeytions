import { useState } from 'react';
import type { LevelProps } from '../../game/types';
import { Agree, Row, Stage } from '../shared/controls';
import s from './PaperOnly.module.css';

export function PaperOnly({ onSolved }: LevelProps) {
  const [preview, setPreview] = useState(false);
  return (
    <Stage className={s.stage}>
      <div className={s.toolbar}><button type="button" className={s.print} onClick={() => setPreview(true)}>🖨 Print</button></div>
      <p className={s.notice}>Electronic signature</p>
      <Row><Agree disabled title="Digital signatures are not accepted">Agree (digital)</Agree></Row>
      {preview && (
        <div className={s.dialog} role="dialog" aria-label="Print preview">
          <div className={s.dialogBar}><span>Print preview · 2 pages</span><button type="button" onClick={() => setPreview(false)}>Cancel</button></div>
          <div className={s.pages}>
            <div className={s.page}><b>Page 1</b><i /><i /><i /><i /></div>
            <div className={s.page}><b>Page 2</b><i /><i /><span className={s.sign}>Sign here:</span><Agree className={s.paperAgree} onClick={onSolved} /></div>
          </div>
        </div>
      )}
    </Stage>
  );
}
