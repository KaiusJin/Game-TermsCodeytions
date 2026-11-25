/** 3:07, or 1:02:09 for very patient players. */
export function formatDuration(ms: number): string {
  const total = Math.max(0, Math.round(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = String(total % 60).padStart(2, '0');
  return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${s}` : `${m}:${s}`;
}

/** One square per agreement: first try, one Disagree, or more. Five per row. */
export function resultGrid(failures: readonly number[]): string {
  const squares = failures.map(n => (n === 0 ? '🟦' : n === 1 ? '🟨' : '🟥'));
  const rows: string[] = [];
  for (let i = 0; i < squares.length; i += 5) rows.push(squares.slice(i, i + 5).join(''));
  return rows.join('\n');
}

export function shareText(failures: readonly number[], elapsedMs: number, url: string): string {
  const disagreements = failures.reduce((a, b) => a + b, 0);
  return [
    'Terms & Codeytions 📜🐕',
    `Agreed to ${failures.length} terms in ${formatDuration(elapsedMs)} · ${disagreements} disagreement${disagreements === 1 ? '' : 's'}`,
    resultGrid(failures),
    url,
  ].join('\n');
}
