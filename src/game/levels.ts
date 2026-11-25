import type { ComponentType } from 'react';
import { levelIds, levelMeta, type LevelId } from '../content/levels';
import { PlainAgree } from '../levels/tier1/PlainAgree';
import { OppositeDay } from '../levels/tier1/OppositeDay';
import { ReadTheRoom } from '../levels/tier1/ReadTheRoom';
import { NeedleInNos } from '../levels/tier1/NeedleInNos';
import { PlainSight } from '../levels/tier1/PlainSight';
import { HoldAgree } from '../levels/tier1/HoldAgree';
import { BoxTicking } from '../levels/tier1/BoxTicking';
import { Runaway } from '../levels/tier1/Runaway';
import { Bilingual } from '../levels/tier1/Bilingual';
import { FinePrint } from '../levels/tier1/FinePrint';
import { Invisible } from '../levels/tier2/Invisible';
import { OutOfTheWay } from '../levels/tier2/OutOfTheWay';
import { AreYouSure } from '../levels/tier2/AreYouSure';
import { Backwards } from '../levels/tier2/Backwards';
import { EndlessScroll } from '../levels/tier2/EndlessScroll';
import { PleaseWait } from '../levels/tier2/PleaseWait';
import { GooseCaptcha } from '../levels/tier2/GooseCaptcha';
import { GreenLight } from '../levels/tier2/GreenLight';
import { Highlight } from '../levels/tier2/Highlight';
import { BreakingNews } from '../levels/tier2/BreakingNews';
import { Assembly } from '../levels/tier2/Assembly';
import { WindowShopping } from '../levels/tier3/WindowShopping';
import { StackPop } from '../levels/tier3/StackPop';
import { MergeConflict } from '../levels/tier3/MergeConflict';
import { Sudo } from '../levels/tier3/Sudo';
import { Compile } from '../levels/tier3/Compile';
import { LightsOut } from '../levels/tier3/LightsOut';
import { Cookies } from '../levels/tier3/Cookies';
import { TypedConsent } from '../levels/tier3/TypedConsent';
import { TwoFactor } from '../levels/tier3/TwoFactor';
import { Undo } from '../levels/tier3/Undo';
import { PageFive } from '../levels/tier3/PageFive';
import { AskCodey } from '../levels/tier3/AskCodey';
import { Stillness } from '../levels/tier3/Stillness';
import { TrueColours } from '../levels/tier3/TrueColours';
import { Recursion } from '../levels/tier3/Recursion';
import { Claw } from '../levels/tier4/Claw';
import { GooseGuard } from '../levels/tier4/GooseGuard';
import { Vending } from '../levels/tier4/Vending';
import { Inspect } from '../levels/tier4/Inspect';
import { UpsideDown } from '../levels/tier4/UpsideDown';
import { Combination } from '../levels/tier4/Combination';
import { Scratch } from '../levels/tier4/Scratch';
import { CodeySays } from '../levels/tier4/CodeySays';
import { Exam } from '../levels/tier4/Exam';
import { MirrorCursor } from '../levels/tier5/MirrorCursor';
import { Pipes } from '../levels/tier5/Pipes';
import { Defuse } from '../levels/tier5/Defuse';
import { Unanimous } from '../levels/tier5/Unanimous';
import { Ascii } from '../levels/tier5/Ascii';
import type { LevelDef, LevelProps } from './types';

const components: Record<LevelId, ComponentType<LevelProps>> = {
  'plain-agree': PlainAgree, 'opposite-day': OppositeDay, 'read-the-room': ReadTheRoom, 'needle': NeedleInNos,
  'plain-sight': PlainSight, 'hold-agree': HoldAgree, 'box-ticking': BoxTicking, 'runaway': Runaway,
  'bilingual': Bilingual, 'fine-print': FinePrint,
  'invisible': Invisible, 'out-of-the-way': OutOfTheWay, 'are-you-sure': AreYouSure, 'backwards': Backwards,
  'endless-scroll': EndlessScroll, 'please-wait': PleaseWait, 'goose-captcha': GooseCaptcha, 'green-light': GreenLight,
  'highlight': Highlight, 'breaking-news': BreakingNews, 'assembly': Assembly,
  'window-shopping': WindowShopping, 'stack-pop': StackPop, 'merge-conflict': MergeConflict, 'sudo': Sudo,
  'compile': Compile, 'lights-out': LightsOut, 'cookies': Cookies, 'typed-consent': TypedConsent,
  'two-factor': TwoFactor, 'undo': Undo, 'page-five': PageFive, 'ask-codey': AskCodey,
  'stillness': Stillness, 'true-colours': TrueColours, 'recursion': Recursion,
  'claw': Claw, 'goose-guard': GooseGuard, 'vending': Vending, 'inspect': Inspect, 'upside-down': UpsideDown,
  'combination': Combination, 'scratch': Scratch, 'codey-says': CodeySays, 'exam': Exam,
  'mirror-cursor': MirrorCursor, 'pipes': Pipes, 'defuse': Defuse, 'unanimous': Unanimous, 'ascii': Ascii,
};

export const levels: LevelDef[] = levelIds.map(id => ({ id, ...levelMeta[id], Component: components[id] }));

export function levelById(id: string): LevelDef | undefined {
  return levels.find(level => level.id === id);
}
