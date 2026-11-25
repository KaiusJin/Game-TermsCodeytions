import type { LevelProps } from '../../game/types';
import { Agree, Disagree, Row, Stage } from '../shared/controls';
import s from './PlainAgree.module.css';

export function PlainAgree({ onSolved, onFailed }: LevelProps) {
  const terms = ['You will be kind to Codey.', 'You will not feed the geese on Ring Road.', 'You understand that this is, in fact, a game.'];
  return (
    <Stage>
      <ol className={s.terms}>{terms.map((term, i) => <li key={term}><span>{String(i + 1).padStart(2, '0')}</span>{term}</li>)}</ol>
      <Row><Disagree onClick={onFailed} /><Agree onClick={onSolved}>Agree ✓</Agree></Row>
    </Stage>
  );
}
