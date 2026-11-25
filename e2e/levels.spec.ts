import { expect, test, type Locator, type Page } from '@playwright/test';
import { levelCopy, type LevelId } from '../src/content/levels';

/** Every level must be solvable the way its answer describes, ending on the Agree stamp. */
type Solver = (page: Page, stage: Locator) => Promise<void>;

const button = (scope: Page | Locator, name: string | RegExp) => scope.getByRole('button', { name, exact: typeof name === 'string' });
const agree = (stage: Locator) => button(stage, 'Agree');

async function dragTo(page: Page, source: Locator, x: number, y: number) {
  const box = await source.boundingBox();
  if (!box) throw new Error('drag source has no box');
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(x, y, { steps: 15 });
  await page.mouse.up();
}

async function center(target: Locator, dx = 0, dy = 0) {
  const box = await target.boundingBox();
  if (!box) throw new Error('target has no box');
  return [box.x + box.width / 2 + dx, box.y + box.height / 2 + dy] as const;
}

async function drag(page: Page, target: Locator, dx: number, dy: number) {
  const box = await target.boundingBox();
  if (!box) throw new Error('drag target has no box');
  const x = box.x + Math.min(box.width / 2, 40);
  const y = box.y + box.height / 2;
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + dx, y + dy, { steps: 12 });
  await page.mouse.up();
}

const solvers: Record<LevelId, Solver> = {
  // Tier 1
  'plain-agree': async (_, stage) => { await button(stage, 'Agree ✓').click(); },
  'opposite-day': async (_, stage) => { await button(stage, 'Disagree').click(); },
  'read-the-room': async (_, stage) => {
    await button(stage, 'Disagree').click();
    await button(stage, 'Disagree').click();
    await agree(stage).click();
  },
  'needle': async (_, stage) => { await agree(stage).click(); },
  'plain-sight': async (_, stage) => { await button(stage, 'agree').click(); },
  'hold-agree': async (page, stage) => {
    await agree(stage).hover();
    await page.mouse.down();
    await page.waitForTimeout(1800);
    await page.mouse.up();
  },
  'box-ticking': async (_, stage) => {
    const boxes = stage.getByRole('checkbox');
    // The visible tick box sits on top of the native input, as in any custom checkbox; click it like a user.
    for (const i of [0, 1, 3]) await boxes.nth(i).check({ force: true });
    await boxes.nth(2).uncheck({ force: true });
    await agree(stage).click();
  },
  'runaway': async (page, stage) => { await agree(stage).focus(); await page.keyboard.press('Enter'); },
  'bilingual': async (_, stage) => { await button(stage, 'J’accepte').click(); },
  'fine-print': async (_, stage) => { await agree(stage).click(); },

  // Tier 2
  'invisible': async (_, stage) => { await agree(stage).hover(); await agree(stage).click(); },
  'out-of-the-way': async (page, stage) => {
    await drag(page, button(stage, /Recommended by our lawyers/), -260, -90);
    await agree(stage).click();
  },
  'are-you-sure': async (page, stage) => {
    await agree(stage).click();
    for (let i = 0; i < 3; i++) await button(page, 'Yes').click();
    await button(page, 'No').click();
  },
  'backwards': async (_, stage) => {
    await stage.getByLabel('Signature').fill('eerga I');
    await agree(stage).click();
  },
  'endless-scroll': async (_, stage) => {
    await button(stage, 'skip to signature').click();
    await agree(stage).click();
  },
  'please-wait': async (_, stage) => {
    await agree(stage).click();
    await button(stage, 'Confirm Agree').click({ timeout: 6000 });
  },
  'goose-captcha': async (_, stage) => {
    for (const tile of [1, 5, 6, 8]) await button(stage, `Tile ${tile}`).click();
    await button(stage, 'Verify').click();
    await agree(stage).click();
  },
  'green-light': async (_, stage) => {
    await expect(stage.getByRole('img', { name: 'Signal is green' })).toBeVisible({ timeout: 6000 });
    await agree(stage).click();
  },
  'highlight': async (_, stage) => { await button(stage, '→ I agree to all of the above ←').click(); },
  'breaking-news': async (_, stage) => {
    // Hovering the ticker pauses it, exactly like a reader leaning in.
    await stage.locator('[class*="ticker"]').first().hover();
    await button(stage, 'AGREE').first().click();
  },
  'assembly': async (_, stage) => {
    for (const letter of ['A', 'G', 'R']) await button(stage, letter).click();
    await button(stage, 'E').nth(0).click();
    await button(stage, 'E').nth(1).click();
    await button(stage, 'Agree ✓').click();
  },

  // Tier 3
  'window-shopping': async (page, stage) => {
    for (const name of ['Codey Weekly', 'Rate us!', 'Update available']) await button(stage, `Close ${name}`).click();
    await drag(page, stage.getByText('DO NOT CLOSE'), 260, 110);
    await agree(stage).click();
  },
  'stack-pop': async (_, stage) => {
    for (let i = 0; i < 5; i++) await button(stage, 'pop()').click();
    await agree(stage).click();
  },
  'merge-conflict': async (_, stage) => {
    await button(stage, 'Accept Incoming Change').click();
    await button(stage, 'Commit merge').click();
    await agree(stage).click();
  },
  'sudo': async (_, stage) => {
    await stage.getByLabel('Terminal input').fill('sudo agree');
    await stage.getByLabel('Terminal input').press('Enter');
    await agree(stage).click();
  },
  'compile': async (_, stage) => {
    await button(stage, 'fasle').click();
    await button(stage, 'false').click();
    await button(stage, 'retrun').click();
    await button(stage, '▶ Run').click();
    await agree(stage).click();
  },
  'lights-out': async (_, stage) => { await agree(stage).click(); },
  'cookies': async (_, stage) => {
    await button(stage, 'Manage choices').click();
    const switches = stage.getByRole('switch');
    for (let i = 0; i < await switches.count(); i++) if (await switches.nth(i).isEnabled()) await switches.nth(i).uncheck({ force: true });
    await button(stage, 'Save my choices').click();
    await agree(stage).click();
  },
  'typed-consent': async page => {
    await page.keyboard.type('agree');
    await page.keyboard.press('Enter');
  },
  'two-factor': async (_, stage) => {
    await button(stage, 'Codey’s phone').click();
    await stage.getByLabel('Enter the 6-digit code').fill('314159');
    await agree(stage).click();
  },
  'undo': async (_, stage) => {
    await button(stage, 'Edit').click();
    await stage.getByRole('menuitem', { name: /Undo Disagree/ }).click();
    await agree(stage).click();
  },
  'page-five': async (_, stage) => {
    await stage.getByLabel('Address bar').fill('csc.uwaterloo.ca/terms?page=5');
    await stage.getByLabel('Address bar').press('Enter');
    await agree(stage).click();
  },
  'ask-codey': async (_, stage) => {
    await button(stage, 'Ask Codey').click();
    await stage.locator('button[class*="sign"]').click();
  },
  'stillness': async (_, stage) => { await agree(stage).click({ timeout: 8000 }); },
  'true-colours': async (_, stage) => {
    await stage.getByLabel(/Button hue/).fill('217');
    await agree(stage).click();
  },
  'recursion': async (_, stage) => {
    for (let i = 0; i < 5; i++) await agree(stage).last().click();
    await button(stage, 'Agree (base case)').click();
  },

  // Tier 4
  'claw': async (page, stage) => {
    const carriage = stage.locator('[class*="carriage"]');
    const left = async () => parseFloat(await carriage.evaluate(el => (el as HTMLElement).style.left));
    await page.keyboard.down('ArrowRight');
    await expect.poll(left, { timeout: 5000, intervals: [16] }).toBeGreaterThan(66);
    await page.keyboard.up('ArrowRight');
    await button(stage, 'DROP').click();
    await agree(stage).click({ timeout: 8000 });
  },
  'goose-guard': async (page, stage) => {
    await stage.getByRole('button', { name: /^Bread/ }).focus();
    for (let i = 0; i < 4; i++) await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(1400);
    await agree(stage).click();
  },
  'vending': async (_, stage) => {
    await button(stage, 'Insert loonie').click();
    for (const key of ['B', '3', 'OK']) await button(stage, key).click();
    await agree(stage).click({ timeout: 4000 });
  },
  'inspect': async (_, stage) => {
    await button(stage, '</>').click();
    await button(stage, 'disabled').click();
    await agree(stage).click();
  },
  'upside-down': async (page, stage) => {
    await stage.getByRole('slider', { name: 'Rotate document' }).focus();
    for (let i = 0; i < 12; i++) await page.keyboard.press('ArrowRight');
    await agree(stage).click();
  },
  'combination': async (_, stage) => {
    for (let i = 0; i < 3; i++) await button(stage, 'Dial 1 down').click();
    for (let i = 0; i < 5; i++) await button(stage, 'Dial 2 down').click();
    await button(stage, 'Dial 3 up').click();
    await button(stage, 'Open').click();
    await agree(stage).click();
  },
  'scratch': async (page, stage) => {
    await stage.getByRole('button', { name: 'Scratch panel (Enter to scratch)' }).nth(2).focus();
    await page.keyboard.press('Enter');
    await agree(stage).click();
  },
  'codey-says': async (_, stage) => {
    await expect(stage.getByText('Codey says: click Agree.')).toBeVisible({ timeout: 15_000 });
    await agree(stage).click();
  },
  'exam': async (_, stage) => {
    await stage.getByText('Only answer D is correct.').click();
    await button(stage, 'Submit & Agree').click();
  },

  // Tier 5
  'mirror-cursor': async (page, stage) => {
    await stage.getByRole('application').focus();
    for (let i = 0; i < 8; i++) await page.keyboard.press('ArrowRight');
    for (let i = 0; i < 8; i++) await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
  },
  'pipes': async (_, stage) => {
    const turns: [number, number, number][] = [[1, 1, 1], [1, 2, 2], [2, 2, 1], [3, 2, 3], [3, 3, 1], [3, 4, 1]];
    for (const [row, col, times] of turns) for (let i = 0; i < times; i++) await button(stage, `Rotate pipe row ${row} column ${col}`).click();
    await agree(stage).click();
  },
  'defuse': async (_, stage) => {
    await button(stage, 'Cut gold wire').click();
    await button(stage, 'Cut black wire').click();
    await agree(stage).click();
  },
  'unanimous': async (_, stage) => {
    await button(stage, /^Member row 1 column 1:/).click();
    await button(stage, /^Member row 2 column 2:/).click();
    await button(stage, 'Agree unanimously').click();
  },
  'ascii': async (_, stage) => {
    const switches = stage.getByRole('checkbox');
    await switches.nth(1).check({ force: true });
    await switches.nth(7).check({ force: true });
    await agree(stage).click();
  },
  // Expansion pack
  'bubble-wrap': async (_, stage) => {
    await button(stage, 'Bubble 18').click();
    await agree(stage).click();
  },
  'section-nine': async (_, stage) => {
    await button(stage, /Section 9/).click();
    await agree(stage).click();
  },
  'self-service': async (page, stage) => {
    const [x, y] = await center(stage.getByText('stamp here'));
    await dragTo(page, button(stage, /^Agree stamp/), x, y);
  },
  'large-print': async (_, stage) => {
    await stage.getByLabel('Zoom').fill('0');
    await agree(stage).click();
  },
  'not-unlike': async (_, stage) => { await button(stage, 'No').click(); },
  'autocorrect': async (_, stage) => {
    await button(stage, /^Spelling suggestions/).click();
    await stage.getByRole('menuitem', { name: 'Agree', exact: true }).click();
    await agree(stage).click();
  },
  'rebranding': async (_, stage) => {
    await button(stage, 'Disagree').dblclick();
    await stage.getByLabel('Rename button').fill('Agree');
    await stage.getByLabel('Rename button').press('Enter');
    await agree(stage).click();
  },
  'copy-that': async (_, stage) => {
    await stage.getByLabel('Your consent code').fill('CSC-4GR33-7H3-73RM5-0F-C0D3Y-W00F-2026');
    await agree(stage).click();
  },
  'paper-only': async (page, stage) => {
    await button(stage, '🖨 Print').click();
    await agree(page.getByRole('dialog', { name: 'Print preview' })).click();
  },
  'overleaf': async (page, stage) => {
    await drag(page, button(stage, /^Fold the corner/), -130, -130);
    await agree(stage).click();
  },
  'rain-check': async (page, stage) => {
    const [x, y] = await center(stage.getByText('Terms & Codeytions'), 0, -10);
    await dragTo(page, button(stage, /^Umbrella/), x, y);
    await agree(stage).click({ timeout: 5000 });
  },
  'classified': async (_, stage) => { await button(stage, 'DJUHH').click(); },
  'binary-search': async (_, stage) => {
    let lo = 1;
    let hi = 100;
    for (let i = 0; i < 7; i++) {
      const mid = Math.floor((lo + hi) / 2);
      await stage.getByLabel('Your guess').fill(String(mid));
      await stage.getByLabel('Your guess').press('Enter');
      const answer = await stage.getByLabel('Codey’s answer').textContent();
      if (answer?.startsWith('Yes')) break;
      if (answer?.startsWith('Higher')) lo = mid + 1; else hi = mid - 1;
    }
    await agree(stage).click();
  },
  'design-handoff': async (_, stage) => {
    for (const name of ['Show Agree button', 'Unlock Agree button', 'Bring Agree button forward']) await button(stage, name).click();
    await agree(stage).click();
  },
  'acrostic': async (_, stage) => {
    for (let i = 0; i < 20; i++) {
      const order = await stage.locator('[data-n]').evaluateAll(els => els.map(el => Number((el as HTMLElement).dataset.n)));
      const at = order.findIndex((n, j) => j < order.length - 1 && n > order[j + 1]);
      if (at < 0) break;
      await button(stage, `Move §${order[at + 1]} up`).click();
    }
    await button(stage, 'AGREE').click();
  },
  'save-the-date': async (_, stage) => {
    for (let i = 0; i < 12 && !(await stage.getByText('March 2026').isVisible()); i++) await button(stage, 'Previous month').click();
    await button(stage, '14').click();
    await button(stage, /^Agree on/).click();
  },
  'pull-request': async (page, stage) => {
    const box = await stage.locator('[class*="cage"]').boundingBox();
    if (!box) throw new Error('no cage');
    await dragTo(page, button(stage, /^Magnet/), box.x + box.width + 40, box.y + box.height / 2);
    await agree(stage).click();
  },
  'spot-difference': async (_, stage) => {
    for (let i = 0; i < 3; i++) await button(stage, 'Suspicious detail').nth(i).click();
    await agree(stage).click();
  },
  'dewey': async (_, stage) => {
    await button(stage, 'QA76.A37').click();
    await agree(stage).click();
  },
  'campus-map': async (_, stage) => {
    await button(stage, 'DC').click();
    await button(stage, '1350').click();
    await agree(stage).click();
  },
  'paw-print': async (_, stage) => {
    await expect(button(stage, 'Toe bean 1')).toBeEnabled({ timeout: 8000 });
    for (const bean of [2, 4, 1, 3, 2]) await button(stage, `Toe bean ${bean}`).click();
    await agree(stage).click();
  },
  'pattern-matching': async (_, stage) => {
    await agree(stage).first().click();
    for (const label of ['Aggree', 'Agggree']) await button(stage, label).click();
    await button(stage, 'Confirm').click();
    await agree(stage).last().click();
  },
  'hanoi': async (_, stage) => {
    for (const [from, to] of [[1, 3], [1, 2], [3, 2], [1, 3], [2, 1], [2, 3], [1, 3]]) {
      await button(stage, `Peg ${from}`).click();
      await button(stage, `Peg ${to}`).click();
    }
    await button(stage, 'AGR + EE = Agree').click();
  },
  'telegraph': async (_, stage) => {
    for (const code of ['.-', '--.', '.-.', '.', '.']) {
      for (const symbol of code) await button(stage, symbol === '.' ? 'Dot' : 'Dash').click();
      await button(stage, 'Next letter').click();
    }
    await agree(stage).click();
  },
  'hide-and-seek': async (_, stage) => {
    for (const tile of [1, 3, 4, 6, 8, 9]) await button(stage, `Tile ${tile}`).click();
    await button(stage, 'Verify').click();
    await agree(stage).click();
  },
  'chain-reaction': async (page, stage) => {
    const [x, y] = await center(stage.getByLabel('Gap', { exact: true }));
    await dragTo(page, button(stage, /^Spare domino/), x, y);
    await button(stage, 'Push').click();
    await agree(stage).click({ timeout: 6000 });
  },
  'balanced-terms': async (_, stage) => {
    await button(stage, '3 kg').click();
    await button(stage, '4 kg').click();
    await agree(stage).click();
  },
  'slippery-slope': async (_, stage) => {
    for (const dir of ['right', 'up', 'right', 'up', 'left']) await button(stage, `Slide ${dir}`).click();
    await agree(stage).click();
  },
  'checkmate': async (_, stage) => {
    for (const square of [/^c4$/, /^e5$/, /^d3$/, /^e1/]) await button(stage, square).click();
    await agree(stage).click();
  },
  'measured-consent': async (_, stage) => {
    for (const step of ['Fill 5 L', 'Pour 5 L → 3 L', 'Empty 3 L', 'Pour 5 L → 3 L', 'Fill 5 L', 'Pour 5 L → 3 L', 'Pour 5 L into slot']) await button(stage, step).click();
    await agree(stage).click();
  },
};

async function openLevel(page: Page, title: string) {
  await page.goto('/');
  await page.locator('body').click({ position: { x: 5, y: 5 } });
  await page.keyboard.type('codey');
  const key = page.getByRole('complementary', { name: 'Answer key (playtesting)' });
  await key.getByRole('button', { name: /All \d+ agreements/ }).click();
  await key.locator('li button').filter({ has: page.locator('b').getByText(title, { exact: true }) }).click();
  await button(key, 'Hide answer key').click();
  const stage = page.getByRole('region', { name: new RegExp(`: ${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`) });
  await expect(stage).toBeVisible();
  return stage;
}

for (const [id, meta] of Object.entries(levelCopy) as [LevelId, (typeof levelCopy)[LevelId]][]) {
  test(`${id}: ${meta.title}`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    const stage = await openLevel(page, meta.title);
    await solvers[id](page, stage);
    // A practice run only reaches its finish screen through an Agree stamp; a Disagree restarts the level instead.
    await expect(page.getByRole('heading', { name: /Practice round/ })).toBeVisible({ timeout: 8000 });
    expect(errors).toEqual([]);
  });
}
