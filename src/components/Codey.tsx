import { asset } from '../assets';

export function Codey({ celebrating = false, className = '' }: { celebrating?: boolean; className?: string }) {
  return <img className={className} src={asset(`codey/${celebrating ? 'codey-events.svg' : 'codey_sitting.svg'}`)} alt="" width={celebrating ? 269 : 219} height={celebrating ? 269 : 247} draggable="false" />;
}
