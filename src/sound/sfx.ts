// Stamp sounds synthesized with Web Audio, so the game ships no audio files.

let context: AudioContext | null = null;

function audio(): AudioContext | null {
  try {
    context ??= new AudioContext();
    if (context.state === 'suspended') void context.resume();
    return context;
  } catch {
    return null;
  }
}

function tone(ctx: AudioContext, opts: { type: OscillatorType; from: number; to?: number; at: number; duration: number; volume: number }) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = opts.type;
  osc.frequency.setValueAtTime(opts.from, opts.at);
  if (opts.to) osc.frequency.exponentialRampToValueAtTime(opts.to, opts.at + opts.duration);
  gain.gain.setValueAtTime(opts.volume, opts.at);
  gain.gain.exponentialRampToValueAtTime(0.0001, opts.at + opts.duration);
  osc.connect(gain).connect(ctx.destination);
  osc.start(opts.at);
  osc.stop(opts.at + opts.duration);
}

/** A short filtered noise burst plus a low thud: rubber stamp meets paper. */
function thump(ctx: AudioContext, at: number) {
  const length = Math.floor(ctx.sampleRate * 0.12);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 3;
  const noise = ctx.createBufferSource();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();
  noise.buffer = buffer;
  filter.type = 'lowpass';
  filter.frequency.value = 900;
  gain.gain.value = 0.5;
  noise.connect(filter).connect(gain).connect(ctx.destination);
  noise.start(at);
  tone(ctx, { type: 'sine', from: 140, to: 50, at, duration: 0.18, volume: 0.6 });
}

export function playStamp(kind: 'agree' | 'disagree') {
  const ctx = audio();
  if (!ctx) return;
  const now = ctx.currentTime + 0.01;
  thump(ctx, now);
  if (kind === 'agree') {
    tone(ctx, { type: 'triangle', from: 1046.5, at: now + 0.12, duration: 0.18, volume: 0.18 });
    tone(ctx, { type: 'triangle', from: 1318.5, at: now + 0.22, duration: 0.3, volume: 0.18 });
  } else {
    tone(ctx, { type: 'sawtooth', from: 160, to: 90, at: now + 0.1, duration: 0.38, volume: 0.12 });
  }
}
