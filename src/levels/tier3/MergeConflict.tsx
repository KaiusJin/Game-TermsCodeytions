import { useState } from 'react';
import type { LevelProps } from '../../game/types';
import { Agree, Row, Stage } from '../shared/controls';
import editor from '../shared/codeEditor.module.css';
import s from './MergeConflict.module.css';

export function MergeConflict({ onSolved, onFailed }: LevelProps) {
  const [phase, setPhase] = useState<'conflict' | 'resolved' | 'committed'>('conflict');
  return (
    <Stage>
      <div className={editor.editor}>
        <div className={editor.editorTab}>consent.ts {phase === 'conflict' ? <em>● 1 conflict</em> : <em className={editor.ok}>✓ resolved</em>}</div>
        <pre className={editor.code}>
          <span className={editor.ln}>1</span>{'// Codey’s consent configuration\n'}
          {phase === 'conflict' ? <>
            <span className={s.lens}>
              <button type="button" onClick={onFailed}>Accept Current Change</button> | <button type="button" onClick={() => setPhase('resolved')}>Accept Incoming Change</button> | <button type="button" onClick={onFailed}>Accept Both Changes</button>
            </span>
            <span className={s.current}><span className={editor.ln}>2</span>{'<<<<<<< HEAD (you)\n'}<span className={editor.ln}>3</span>{'export const consent = "disagree";\n'}</span>
            <span className={s.sep}><span className={editor.ln}>4</span>{'=======\n'}</span>
            <span className={s.incoming}><span className={editor.ln}>5</span>{'export const consent = "agree";\n'}<span className={editor.ln}>6</span>{'>>>>>>> codey/consent (incoming)\n'}</span>
          </> : <><span className={editor.ln}>2</span>{'export const consent = "agree";\n'}</>}
        </pre>
      </div>
      <Row>
        {phase === 'resolved' && <button type="button" className="button dark" onClick={() => setPhase('committed')}>Commit merge</button>}
        <Agree disabled={phase !== 'committed'} onClick={onSolved} />
      </Row>
    </Stage>
  );
}
