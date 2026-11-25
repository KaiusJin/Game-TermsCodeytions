import { lazy, type ComponentType } from 'react';
import { levelIds, levelMeta, type LevelId } from '../content/levels';
import type { LevelDef, LevelProps } from './types';

type LevelModule = { default: ComponentType<LevelProps> };

// Each level is its own chunk, so the first page load only carries the shell.
const loaders: Record<LevelId, () => Promise<LevelModule>> = {
  'plain-agree': () => import('../levels/tier1/PlainAgree').then(m => ({ default: m.PlainAgree })),
  'opposite-day': () => import('../levels/tier1/OppositeDay').then(m => ({ default: m.OppositeDay })),
  'read-the-room': () => import('../levels/tier1/ReadTheRoom').then(m => ({ default: m.ReadTheRoom })),
  'needle': () => import('../levels/tier1/NeedleInNos').then(m => ({ default: m.NeedleInNos })),
  'plain-sight': () => import('../levels/tier1/PlainSight').then(m => ({ default: m.PlainSight })),
  'hold-agree': () => import('../levels/tier1/HoldAgree').then(m => ({ default: m.HoldAgree })),
  'box-ticking': () => import('../levels/tier1/BoxTicking').then(m => ({ default: m.BoxTicking })),
  'runaway': () => import('../levels/tier1/Runaway').then(m => ({ default: m.Runaway })),
  'bilingual': () => import('../levels/tier1/Bilingual').then(m => ({ default: m.Bilingual })),
  'fine-print': () => import('../levels/tier1/FinePrint').then(m => ({ default: m.FinePrint })),
  'invisible': () => import('../levels/tier2/Invisible').then(m => ({ default: m.Invisible })),
  'out-of-the-way': () => import('../levels/tier2/OutOfTheWay').then(m => ({ default: m.OutOfTheWay })),
  'are-you-sure': () => import('../levels/tier2/AreYouSure').then(m => ({ default: m.AreYouSure })),
  'backwards': () => import('../levels/tier2/Backwards').then(m => ({ default: m.Backwards })),
  'endless-scroll': () => import('../levels/tier2/EndlessScroll').then(m => ({ default: m.EndlessScroll })),
  'please-wait': () => import('../levels/tier2/PleaseWait').then(m => ({ default: m.PleaseWait })),
  'goose-captcha': () => import('../levels/tier2/GooseCaptcha').then(m => ({ default: m.GooseCaptcha })),
  'green-light': () => import('../levels/tier2/GreenLight').then(m => ({ default: m.GreenLight })),
  'highlight': () => import('../levels/tier2/Highlight').then(m => ({ default: m.Highlight })),
  'breaking-news': () => import('../levels/tier2/BreakingNews').then(m => ({ default: m.BreakingNews })),
  'assembly': () => import('../levels/tier2/Assembly').then(m => ({ default: m.Assembly })),
  'window-shopping': () => import('../levels/tier3/WindowShopping').then(m => ({ default: m.WindowShopping })),
  'stack-pop': () => import('../levels/tier3/StackPop').then(m => ({ default: m.StackPop })),
  'merge-conflict': () => import('../levels/tier3/MergeConflict').then(m => ({ default: m.MergeConflict })),
  'sudo': () => import('../levels/tier3/Sudo').then(m => ({ default: m.Sudo })),
  'compile': () => import('../levels/tier3/Compile').then(m => ({ default: m.Compile })),
  'lights-out': () => import('../levels/tier3/LightsOut').then(m => ({ default: m.LightsOut })),
  'cookies': () => import('../levels/tier3/Cookies').then(m => ({ default: m.Cookies })),
  'typed-consent': () => import('../levels/tier3/TypedConsent').then(m => ({ default: m.TypedConsent })),
  'two-factor': () => import('../levels/tier3/TwoFactor').then(m => ({ default: m.TwoFactor })),
  'undo': () => import('../levels/tier3/Undo').then(m => ({ default: m.Undo })),
  'page-five': () => import('../levels/tier3/PageFive').then(m => ({ default: m.PageFive })),
  'ask-codey': () => import('../levels/tier3/AskCodey').then(m => ({ default: m.AskCodey })),
  'stillness': () => import('../levels/tier3/Stillness').then(m => ({ default: m.Stillness })),
  'true-colours': () => import('../levels/tier3/TrueColours').then(m => ({ default: m.TrueColours })),
  'recursion': () => import('../levels/tier3/Recursion').then(m => ({ default: m.Recursion })),
  'claw': () => import('../levels/tier4/Claw').then(m => ({ default: m.Claw })),
  'goose-guard': () => import('../levels/tier4/GooseGuard').then(m => ({ default: m.GooseGuard })),
  'vending': () => import('../levels/tier4/Vending').then(m => ({ default: m.Vending })),
  'inspect': () => import('../levels/tier4/Inspect').then(m => ({ default: m.Inspect })),
  'upside-down': () => import('../levels/tier4/UpsideDown').then(m => ({ default: m.UpsideDown })),
  'combination': () => import('../levels/tier4/Combination').then(m => ({ default: m.Combination })),
  'scratch': () => import('../levels/tier4/Scratch').then(m => ({ default: m.Scratch })),
  'codey-says': () => import('../levels/tier4/CodeySays').then(m => ({ default: m.CodeySays })),
  'exam': () => import('../levels/tier4/Exam').then(m => ({ default: m.Exam })),
  'mirror-cursor': () => import('../levels/tier5/MirrorCursor').then(m => ({ default: m.MirrorCursor })),
  'pipes': () => import('../levels/tier5/Pipes').then(m => ({ default: m.Pipes })),
  'defuse': () => import('../levels/tier5/Defuse').then(m => ({ default: m.Defuse })),
  'unanimous': () => import('../levels/tier5/Unanimous').then(m => ({ default: m.Unanimous })),
  'ascii': () => import('../levels/tier5/Ascii').then(m => ({ default: m.Ascii })),
};

export const levels: LevelDef[] = levelIds.map(id => ({ id, ...levelMeta[id], Component: lazy(loaders[id]), preload: loaders[id] }));

export function levelById(id: string): LevelDef | undefined {
  return levels.find(level => level.id === id);
}

/** Fetches every level of a run up front so no agreement waits on the network mid-game. */
export function preloadLevels(ids: readonly string[]): void {
  for (const id of ids) void levelById(id)?.preload().catch(() => { /* Suspense retries when the level renders. */ });
}
