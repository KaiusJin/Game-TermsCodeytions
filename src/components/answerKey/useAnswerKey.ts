import { useCallback, useEffect, useRef, useState } from 'react';

const secret = 'codey';
const tapsNeeded = 5;
const tapWindowMs = 2000;
const storageKey = 'terms-codeytions:counsel';

function readOpen(): boolean {
  try { return localStorage.getItem(storageKey) === '1'; } catch { return false; }
}

/**
 * Hidden answer key for playtesting. It toggles when someone types “codey” outside a text field,
 * or calls `tapSecret` five times within two seconds (wired to the ✳ in the footer).
 */
export function useAnswerKey() {
  const [open, setOpen] = useState(readOpen);
  const taps = useRef<number[]>([]);

  useEffect(() => {
    try { localStorage.setItem(storageKey, open ? '1' : '0'); } catch { /* Remembering the toggle is optional. */ }
  }, [open]);

  useEffect(() => {
    let buffer = '';
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.key.length !== 1) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-secret.length);
      if (buffer === secret) { buffer = ''; setOpen(o => !o); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const tapSecret = useCallback(() => {
    const now = Date.now();
    taps.current = [...taps.current.filter(t => now - t < tapWindowMs), now];
    if (taps.current.length >= tapsNeeded) { taps.current = []; setOpen(o => !o); }
  }, []);

  const close = useCallback(() => setOpen(false), []);

  return { open, close, tapSecret };
}
