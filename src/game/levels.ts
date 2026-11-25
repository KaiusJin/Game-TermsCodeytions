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
  'bubble-wrap': () => import('../levels/tier1/PopCulture').then(m => ({ default: m.PopCulture })),
  'section-nine': () => import('../levels/tier1/SectionNine').then(m => ({ default: m.SectionNine })),
  'self-service': () => import('../levels/tier1/SelfService').then(m => ({ default: m.SelfService })),
  'large-print': () => import('../levels/tier2/LargePrint').then(m => ({ default: m.LargePrint })),
  'not-unlike': () => import('../levels/tier2/NotUnlike').then(m => ({ default: m.NotUnlike })),
  'autocorrect': () => import('../levels/tier2/Autocorrect').then(m => ({ default: m.Autocorrect })),
  'rebranding': () => import('../levels/tier2/Rebranding').then(m => ({ default: m.Rebranding })),
  'copy-that': () => import('../levels/tier2/CopyThat').then(m => ({ default: m.CopyThat })),
  'paper-only': () => import('../levels/tier2/PaperOnly').then(m => ({ default: m.PaperOnly })),
  'overleaf': () => import('../levels/tier2/Overleaf').then(m => ({ default: m.Overleaf })),
  'rain-check': () => import('../levels/tier2/RainCheck').then(m => ({ default: m.RainCheck })),
  'classified': () => import('../levels/tier3/Classified').then(m => ({ default: m.Classified })),
  'binary-search': () => import('../levels/tier3/BinarySearch').then(m => ({ default: m.BinarySearch })),
  'design-handoff': () => import('../levels/tier3/DesignHandoff').then(m => ({ default: m.DesignHandoff })),
  'acrostic': () => import('../levels/tier3/ReadBetweenLines').then(m => ({ default: m.ReadBetweenLines })),
  'save-the-date': () => import('../levels/tier3/SaveTheDate').then(m => ({ default: m.SaveTheDate })),
  'pull-request': () => import('../levels/tier3/PullRequest').then(m => ({ default: m.PullRequest })),
  'spot-difference': () => import('../levels/tier3/SpotTheDifference').then(m => ({ default: m.SpotTheDifference })),
  'dewey': () => import('../levels/tier3/DeweyDecimal').then(m => ({ default: m.DeweyDecimal })),
  'campus-map': () => import('../levels/tier3/CampusMap').then(m => ({ default: m.CampusMap })),
  'paw-print': () => import('../levels/tier3/PawPrint').then(m => ({ default: m.PawPrint })),
  'pattern-matching': () => import('../levels/tier4/PatternMatching').then(m => ({ default: m.PatternMatching })),
  'hanoi': () => import('../levels/tier4/TowerOfCodey').then(m => ({ default: m.TowerOfCodey })),
  'telegraph': () => import('../levels/tier4/Telegraph').then(m => ({ default: m.Telegraph })),
  'hide-and-seek': () => import('../levels/tier4/HideAndSeek').then(m => ({ default: m.HideAndSeek })),
  'chain-reaction': () => import('../levels/tier4/ChainReaction').then(m => ({ default: m.ChainReaction })),
  'balanced-terms': () => import('../levels/tier4/BalancedTerms').then(m => ({ default: m.BalancedTerms })),
  'slippery-slope': () => import('../levels/tier5/SlipperySlope').then(m => ({ default: m.SlipperySlope })),
  'checkmate': () => import('../levels/tier5/Checkmate').then(m => ({ default: m.Checkmate })),
  'measured-consent': () => import('../levels/tier5/MeasuredConsent').then(m => ({ default: m.MeasuredConsent })),
};

export const levels: LevelDef[] = levelIds.map(id => ({ id, ...levelMeta[id], Component: lazy(loaders[id]), preload: loaders[id] }));

export function levelById(id: string): LevelDef | undefined {
  return levels.find(level => level.id === id);
}

/** Fetches every level of a run up front so no agreement waits on the network mid-game. */
export function preloadLevels(ids: readonly string[]): void {
  for (const id of ids) void levelById(id)?.preload().catch(() => { /* Suspense retries when the level renders. */ });
}
