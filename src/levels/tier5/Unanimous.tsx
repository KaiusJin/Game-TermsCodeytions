import { useState } from 'react';
import { motion } from 'framer-motion';
import type { LevelProps } from '../../game/types';
import { asset } from '../../assets';
import { Agree, Row, Stage } from '../shared/controls';
import s from './Unanimous.module.css';

const startVotes = [[false, true, true], [true, false, false], [true, false, true]];

export function Unanimous({ onSolved }: LevelProps) {
  const [votes, setVotes] = useState(startVotes);
  const all = votes.every(row => row.every(Boolean));
  function flip(r: number, c: number) {
    setVotes(votes.map((row, i) => row.map((v, j) => (Math.abs(i - r) + Math.abs(j - c) <= 1 ? !v : v))));
  }
  return (
    <Stage className={s.voteStage}>
      <div className={s.committee}>
        {votes.map((row, r) => row.map((v, c) => (
          <motion.button key={`${r}${c}`} type="button" className={s.member} data-agree={v} onClick={() => flip(r, c)} disabled={all}
            aria-label={`Member row ${r + 1} column ${c + 1}: ${v ? 'agrees' : 'disagrees'}`} animate={{ rotateY: v ? 0 : 180 }} transition={{ duration: .3 }}>
            <img src={asset('codey/codey_sitting.svg')} alt="" />
            <span>{v ? '✓' : '✗'}</span>
          </motion.button>
        )))}
      </div>
      <Row><Agree disabled={!all} onClick={onSolved}>Agree unanimously</Agree></Row>
    </Stage>
  );
}
