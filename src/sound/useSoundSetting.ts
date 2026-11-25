import { useEffect, useState } from 'react';

const storageKey = 'terms-codeytions:sound';

function readEnabled(): boolean {
  try { return localStorage.getItem(storageKey) !== 'off'; } catch { return true; }
}

/** Sound is on by default; the player's choice is remembered when storage allows. */
export function useSoundSetting() {
  const [enabled, setEnabled] = useState(readEnabled);
  useEffect(() => {
    try { localStorage.setItem(storageKey, enabled ? 'on' : 'off'); } catch { /* Remembering the choice is optional. */ }
  }, [enabled]);
  return [enabled, setEnabled] as const;
}
