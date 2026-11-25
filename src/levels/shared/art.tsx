// Inline illustrations reused by several levels.

/** A Canada goose, drawn inline so it can be reused by several levels. */
export function Goose({ size = 72, className = '' }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 80 80" aria-hidden="true">
      <ellipse cx="44" cy="56" rx="24" ry="14" fill="#8b7355" />
      <path d="M26 52c6-8 22-10 36-4-6 10-26 14-36 4Z" fill="#6b5640" />
      <ellipse cx="44" cy="66" rx="16" ry="5" fill="#efe9dc" />
      <path d="M28 52c-4-12-6-24-2-32 3-6 10-6 12 0 1 4-2 8-4 14-2 6 0 12 2 16Z" fill="#1a1a1a" />
      <ellipse cx="31" cy="20" rx="8" ry="7" fill="#1a1a1a" />
      <path d="M27 21c2-4 7-5 9-2-2 3-6 4-9 2Z" fill="#fff" />
      <path d="M23 18l-9 3 9 2Z" fill="#2a2a2a" />
      <circle cx="29" cy="17" r="1.3" fill="#fff" />
      <path d="M40 70v6M48 70v6" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function Duck({ size = 72 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden="true">
      <ellipse cx="42" cy="54" rx="24" ry="15" fill="#ffd23f" />
      <circle cx="30" cy="32" r="13" fill="#ffd23f" />
      <path d="M16 34c-6 0-9 3-9 4 4 2 9 2 12 0Z" fill="#f28c28" />
      <circle cx="27" cy="29" r="2" fill="#1a1a1a" />
      <path d="M44 50c8-2 14 0 18 6-8 4-15 3-18-6Z" fill="#f4c020" />
    </svg>
  );
}
