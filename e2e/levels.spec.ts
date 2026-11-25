import { expect, test, type Locator, type Page } from '@playwright/test';
import { levelCopy, type LevelId } from '../src/content/levels';

/** Every level must be solvable the way its answer describes, ending on the Agree stamp. */
type Solver = (page: Page, stage: Locator) => Promise<void>;

const button = (scope: Page | Locator, name: string | RegExp) => scope.getByRole('button', { name, exact: typeof name === 'string' });
const agree = (stage: Locator) => button(stage, 'Agree');

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
};

async function openLevel(page: Page, title: string) {
  await page.goto('/');
  await page.locator('body').click({ position: { x: 5, y: 5 } });
  await page.keyboard.type('codey');
  const key = page.getByRole('complementary', { name: 'Answer key (playtesting)' });
  await key.getByRole('button', { name: /All 50 agreements/ }).click();
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
