import { useState } from 'react';
import type { LevelProps } from '../../game/types';
import { Agree, Row, Stage } from '../shared/controls';
import editor from '../shared/codeEditor.module.css';
import s from './Compile.module.css';

const consentTokens = ['fasle', 'false', 'true'];

const returnTokens = ['retrun', 'return'];

export function Compile({ onSolved }: LevelProps) {
  const [consent, setConsent] = useState(0);
  const [ret, setRet] = useState(0);
  const [output, setOutput] = useState<{ text: string; ok: boolean } | null>(null);
  function run() {
    if (ret === 0) setOutput({ text: "SyntaxError: Unexpected identifier 'retrun' (line 3)", ok: false });
    else if (consent === 0) setOutput({ text: 'ReferenceError: fasle is not defined (line 2)', ok: false });
    else if (consent === 1) setOutput({ text: '→ false. Agreement denied. Codey is sad.', ok: false });
    else setOutput({ text: '→ true ✓ Build succeeded in 0.42s', ok: true });
  }
  const token = (label: string, onClick: () => void) => <button type="button" className={s.token} onClick={() => { setOutput(null); onClick(); }}>{label}</button>;
  return (
    <Stage>
      <div className={editor.editor}>
        <div className={editor.editorTab}>consent.js</div>
        <pre className={editor.code}>
          <span className={editor.ln}>1</span><span className={s.kw}>function</span>{' canAgree(user) {\n'}
          <span className={editor.ln}>2</span>{'  '}<span className={s.kw}>const</span>{' consent = '}{token(consentTokens[consent], () => setConsent((consent + 1) % 3))}{';\n'}
          <span className={editor.ln}>3</span>{'  '}{token(returnTokens[ret], () => setRet((ret + 1) % 2))}{' consent;\n'}
          <span className={editor.ln}>4</span>{'}\n'}
        </pre>
        <div className={s.console} data-ok={output?.ok ?? 'idle'}>{output?.text ?? '> ready'}</div>
      </div>
      <Row>
        <button type="button" className="button dark" onClick={run}>▶ Run</button>
        <Agree disabled={!output?.ok} onClick={onSolved} />
      </Row>
    </Stage>
  );
}
