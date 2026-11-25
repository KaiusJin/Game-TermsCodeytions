import { useState } from 'react';
import type { LevelProps } from '../../game/types';
import { Agree, Disagree, Row, Stage } from '../shared/controls';
import s from './SectionNine.module.css';

const sections = [
  ['Definitions', '“Agree” means agree. “Codey” means Codey. “Geese” means trouble.'],
  ['Eligibility', 'You must be a person, or a very convincing goose.'],
  ['Snacks', 'Snacks brought to office hours become club property.'],
  ['Naps', 'Codey may nap at any time, for any reason.'],
  ['Midterms', 'This agreement is not responsible for your midterm grades.'],
  ['Wi-Fi', 'Eduroam may disconnect without notice.'],
  ['Geese', 'Do not make eye contact.'],
  ['Severability', 'If any clause is invalid, the rest remain very valid.'],
] as const;

export function SectionNine({ onSolved, onFailed }: LevelProps) {
  const [open, setOpen] = useState<number | null>(null);
  const toggle = (i: number) => setOpen(open === i ? null : i);
  return (
    <Stage>
      <div className={s.accordion}>
        {sections.map(([title, body], i) => (
          <div key={title} className={s.section}>
            <button type="button" className={s.head} aria-expanded={open === i} onClick={() => toggle(i)}><span>Section {i + 1}</span>{title}<i aria-hidden="true">{open === i ? '−' : '+'}</i></button>
            {open === i && <p className={s.body}>{body}</p>}
          </div>
        ))}
        <div className={s.section}>
          <button type="button" className={s.head} aria-expanded={open === 8} onClick={() => toggle(8)}><span>Section 9</span><em>(intentionally left empty)</em><i aria-hidden="true">{open === 8 ? '−' : '+'}</i></button>
          {open === 8 && <div className={s.body}><Agree onClick={onSolved} /></div>}
        </div>
      </div>
      <Row><Disagree onClick={onFailed} /></Row>
    </Stage>
  );
}
