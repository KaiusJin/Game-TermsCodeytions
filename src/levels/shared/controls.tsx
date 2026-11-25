import type { ComponentPropsWithRef, HTMLAttributes, ReactNode } from 'react';
import styles from './controls.module.css';

type ButtonProps = ComponentPropsWithRef<'button'>;

export function Agree({ children = 'Agree', className = '', ...rest }: ButtonProps) {
  return <button type="button" className={`button primary ${className}`} {...rest}>{children}</button>;
}

export function Disagree({ children = 'Disagree', className = '', ...rest }: ButtonProps) {
  return <button type="button" className={`button secondary ${className}`} {...rest}>{children}</button>;
}

export function Stage({ children, className = '', label, ...rest }: HTMLAttributes<HTMLDivElement> & { label?: string }) {
  return <div className={`${styles.stage} ${className}`} aria-label={label} {...rest}>{children}</div>;
}

export function Row({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`${styles.row} ${className}`}>{children}</div>;
}
