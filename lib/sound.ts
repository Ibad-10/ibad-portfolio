/** Tiny WebAudio synth so the site needs no audio files. Off by default; created only after a user gesture. */
type Ctx = AudioContext;

let ctx: Ctx | null = null;
let enabled = false;
const PREF_KEY = "sound-enabled";

export function loadSoundPref(): boolean {
  try {
    return localStorage.getItem(PREF_KEY) === "1";
  } catch {
    return false;
  }
}

export function setSoundEnabled(on: boolean) {
  enabled = on;
  try {
    localStorage.setItem(PREF_KEY, on ? "1" : "0");
  } catch {
    /* ignore */
  }
  if (on) ensureCtx();
}

function ensureCtx(): Ctx | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function noiseBuffer(c: Ctx, seconds: number): AudioBuffer {
  const buf = c.createBuffer(1, Math.floor(c.sampleRate * seconds), c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  return buf;
}

function tone(c: Ctx, freq: number, start: number, dur: number, gain: number, type: OscillatorType = "sine") {
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.setValueAtTime(0, start);
  g.gain.linearRampToValueAtTime(gain, start + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  o.connect(g).connect(c.destination);
  o.start(start);
  o.stop(start + dur + 0.05);
}

function burst(c: Ctx, start: number, dur: number, gain: number, freq: number, q = 1) {
  const src = c.createBufferSource();
  src.buffer = noiseBuffer(c, dur + 0.1);
  const f = c.createBiquadFilter();
  f.type = "bandpass";
  f.frequency.value = freq;
  f.Q.value = q;
  const g = c.createGain();
  g.gain.setValueAtTime(0, start);
  g.gain.linearRampToValueAtTime(gain, start + Math.min(0.15, dur / 3));
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  src.connect(f).connect(g).connect(c.destination);
  src.start(start);
  src.stop(start + dur + 0.1);
}

export type Sfx = "click" | "whistle" | "kick" | "goal" | "save" | "miss";

export function play(name: Sfx) {
  if (!enabled) return;
  const c = ensureCtx();
  if (!c) return;
  const t = c.currentTime;
  switch (name) {
    case "click":
      tone(c, 880, t, 0.06, 0.08, "square");
      break;
    case "whistle":
      tone(c, 2900, t, 0.35, 0.12, "sine");
      tone(c, 3100, t + 0.4, 0.5, 0.12, "sine");
      break;
    case "kick":
      tone(c, 120, t, 0.12, 0.35, "sine");
      burst(c, t, 0.08, 0.2, 900, 0.8);
      break;
    case "goal":
      burst(c, t, 1.6, 0.35, 1400, 0.5);
      tone(c, 523, t + 0.1, 0.25, 0.08, "triangle");
      tone(c, 659, t + 0.3, 0.25, 0.08, "triangle");
      tone(c, 784, t + 0.5, 0.45, 0.08, "triangle");
      break;
    case "save":
      burst(c, t, 0.25, 0.25, 500, 1);
      tone(c, 200, t, 0.2, 0.15, "sine");
      break;
    case "miss":
      burst(c, t, 0.6, 0.15, 700, 0.6);
      break;
  }
}
