import { asset } from '../assets';

const art = {
  sitting: { file: 'codey_sitting.svg', width: 219, height: 247 },
  celebrating: { file: 'codey-events.svg', width: 269, height: 269 },
  confused: { file: 'codey-404.svg', width: 435, height: 388 },
} as const;

export type CodeyMood = keyof typeof art;

export function Codey({ mood = 'sitting', className = '' }: { mood?: CodeyMood; className?: string }) {
  const { file, width, height } = art[mood];
  return <img className={className} src={asset(`codey/${file}`)} alt="" width={width} height={height} draggable="false" />;
}
