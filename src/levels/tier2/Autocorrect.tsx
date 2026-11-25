import { useState } from 'react';
import type { LevelProps } from '../../game/types';
import { Agree, Row, Stage } from '../shared/controls';
import s from './Autocorrect.module.css';

const suggestions = ['Agree', 'Agra', 'Ogre', 'Ignore'];

export function Autocorrect({ onSolved }: LevelProps) {
  const [word, setWord] = useState('agre');
  const [menu, setMenu] = useState(false);
  const fixed = word === 'Agree';
  return (
    <Stage>
      <p className={s.text}>
        By continuing, the user hereby confirms that they{' '}
        <span className={s.wordWrap}>
          <button type="button" className={s.word} data-fixed={fixed} aria-haspopup="menu" aria-expanded={menu} aria-label={`Spelling suggestions for “${word}”`} onClick={() => setMenu(!menu)}>{word}</button>
          {menu && (
            <span className={s.menu} role="menu">
              <small>Spelling suggestions</small>
              {suggestions.map(option => (
                <button key={option} type="button" role="menuitem" onClick={() => { if (option !== 'Ignore') setWord(option); setMenu(false); }}>{option}</button>
              ))}
            </span>
          )}
        </span>{' '}
        to the terms above, in full and in good spelling.
      </p>
      <Row><Agree disabled={!fixed} onClick={onSolved} title={fixed ? undefined : 'Please fix spelling errors first'} /></Row>
    </Stage>
  );
}
