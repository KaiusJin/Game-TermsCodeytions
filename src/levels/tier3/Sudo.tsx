import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import type { LevelProps } from '../../game/types';
import { Agree, Row, Stage } from '../shared/controls';
import s from './Sudo.module.css';

function runCommand(raw: string): { out: string; unlock?: boolean; clear?: boolean } {
  const cmd = raw.trim().replace(/\s+/g, ' ');
  switch (cmd) {
    case '': return { out: '' };
    case 'help': return { out: 'commands: help, ls, whoami, cat terms.txt, agree, clear' };
    case 'ls': return { out: 'terms.txt  agree*  goose.png' };
    case 'whoami': return { out: 'student (not root)' };
    case 'cat terms.txt': return { out: 'You agree to agree. Only root may agree.' };
    case 'agree': case './agree': return { out: 'agree: permission denied (are you root?)' };
    case 'sudo agree': case 'sudo ./agree': return { out: '[sudo] Codey vouches for you.\nAgreement unlocked ✓', unlock: true };
    case 'clear': return { out: '', clear: true };
    case 'rm -rf /': case 'sudo rm -rf /': return { out: 'Nice try.' };
    default: return { out: `zsh: command not found: ${cmd.split(' ')[0]}` };
  }
}

export function Sudo({ onSolved }: LevelProps) {
  const [lines, setLines] = useState<string[]>(['CSC Terminal v1.0 — type `help`']);
  const [input, setInput] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const body = useRef<HTMLDivElement>(null);
  useEffect(() => { body.current?.scrollTo({ top: body.current.scrollHeight }); }, [lines]);
  function submit(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter') return;
    const result = runCommand(input);
    setLines(result.clear ? [] : [...lines, `$ ${input}`, ...(result.out ? result.out.split('\n') : [])]);
    if (result.unlock) setUnlocked(true);
    setInput('');
  }
  return (
    <Stage>
      <div className={s.terminal} onClick={() => inputRef.current?.focus()}>
        <div className={s.termBar}><i /><i /><i /><span>codey@csc: ~</span></div>
        <div ref={body} className={s.termBody}>
          {lines.map((line, i) => <div key={i}>{line}</div>)}
          <label className={s.prompt}>$ <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={submit} autoComplete="off" autoCapitalize="off" spellCheck={false} aria-label="Terminal input" /></label>
        </div>
      </div>
      <Row><Agree disabled={!unlocked} onClick={onSolved} /></Row>
    </Stage>
  );
}
