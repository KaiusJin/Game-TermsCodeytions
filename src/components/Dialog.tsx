import { useEffect, useRef, type ReactNode } from 'react';
import { copy } from '../content/en';
import { Icon } from './Icon';
import styles from './Dialog.module.css';

export function Dialog({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    const previousFocus = document.activeElement;
    dialog?.showModal();
    return () => {
      dialog?.close();
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, []);

  return (
    <dialog ref={ref} className={styles.dialog} aria-labelledby="dialog-title" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
      <div className={styles.body}>
        <button autoFocus className={styles.close} onClick={onClose} aria-label={copy.dialogs.close}><Icon name="close" /></button>
        <span className="eyebrow">TERMS & CODEYTIONS</span>
        <h2 id="dialog-title">{title}</h2>
        {children}
      </div>
    </dialog>
  );
}
