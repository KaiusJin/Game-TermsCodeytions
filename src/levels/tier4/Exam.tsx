import { useState } from 'react';
import type { LevelProps } from '../../game/types';
import { Agree, Row, Stage } from '../shared/controls';
import s from './Exam.module.css';

const examOptions = [['A', 'Answer B is correct.'], ['B', 'Answer C is correct.'], ['C', 'Answer A is correct.'], ['D', 'Only answer D is correct.']] as const;

export function Exam({ onSolved, onFailed }: LevelProps) {
  const [choice, setChoice] = useState<string | null>(null);
  return (
    <Stage>
      <div className={s.exam}>
        <div className={s.examHead}><span>CS 135 · FINAL</span><span>Name: ________</span></div>
        <p className={s.question}><b>Q1.</b> Exactly one of the following is correct. Which one?</p>
        {examOptions.map(([key, text]) => (
          <label key={key} className={s.option} data-on={choice === key}>
            <input type="radio" name="exam" checked={choice === key} onChange={() => setChoice(key)} />
            <span className={s.bubbleOpt}>{key}</span>{text}
          </label>
        ))}
      </div>
      <Row><Agree disabled={!choice} onClick={() => (choice === 'D' ? onSolved() : onFailed())}>Submit &amp; Agree</Agree></Row>
    </Stage>
  );
}
