// Sound from Truths Astray: the looping music track, each character's voice
// blip and Astara's footsteps. Off by default. Browsers only allow audio after
// a click or key press, so nothing plays until the visitor turns it on (or,
// if they turned it on last visit, until their first interaction).

import { basePath } from './state';

const KEY = 'pf.sound';
const MUSIC_VOLUME = 0.45;
const DUCKED = 0.32; // the game drops the music by 10 dB while someone talks
const STEPS = 5;

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let musicGain: GainNode | null = null;
let musicSource: AudioBufferSourceNode | null = null;
let voiceSource: AudioBufferSourceNode | null = null;
let ducked = false;
let on = readSaved();
const buffers = new Map<string, Promise<AudioBuffer | null>>();

function readSaved(): boolean {
  try {
    return localStorage.getItem(KEY) === 'on';
  } catch {
    return false;
  }
}

function writeSaved(): void {
  try {
    localStorage.setItem(KEY, on ? 'on' : 'off');
  } catch {
    /* storage unavailable */
  }
}

const src = (name: string): string => `${basePath()}/media/truths-astray/audio/${name}.mp3`;

function buffer(name: string): Promise<AudioBuffer | null> {
  let pending = buffers.get(name);
  if (!pending) {
    pending = fetch(src(name))
      .then((r) => (r.ok ? r.arrayBuffer() : Promise.reject(new Error(r.statusText))))
      .then((data) => ctx!.decodeAudioData(data))
      .catch(() => null);
    buffers.set(name, pending);
  }
  return pending;
}

function ensureContext(): boolean {
  if (ctx) return true;
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return false;
  ctx = new Ctor();
  master = ctx.createGain();
  master.connect(ctx.destination);
  musicGain = ctx.createGain();
  musicGain.gain.value = 0;
  musicGain.connect(master);
  return true;
}

async function startMusic(): Promise<void> {
  if (!ctx || !musicGain || musicSource) return;
  const track = await buffer('weed_astray');
  if (!track || !on || musicSource) return;
  musicSource = ctx.createBufferSource();
  musicSource.buffer = track;
  musicSource.loop = true;
  musicSource.connect(musicGain);
  musicSource.start();
  fadeMusic(1.2);
}

function fadeMusic(seconds: number): void {
  if (!ctx || !musicGain) return;
  const level = on ? MUSIC_VOLUME * (ducked ? DUCKED : 1) : 0;
  const now = ctx.currentTime;
  musicGain.gain.cancelScheduledValues(now);
  musicGain.gain.setValueAtTime(musicGain.gain.value, now);
  musicGain.gain.linearRampToValueAtTime(level, now + seconds);
}

function stopMusic(): void {
  if (!ctx || !musicSource) return;
  const source = musicSource;
  musicSource = null;
  fadeMusic(0.4);
  source.stop(ctx.currentTime + 0.45);
}

export const soundOn = (): boolean => on;

export function setSound(next: boolean): void {
  on = next;
  writeSaved();
  if (on) {
    if (!ensureContext()) return;
    void ctx!.resume();
    void startMusic();
    // Warm the short clips so the first line of dialogue has its voice.
    ['dorothy', 'sarah', 'wei', 'krishna', 'jenny', 'astara'].forEach((n) => void buffer(`voice_${n}`));
    for (let i = 0; i < STEPS; i++) void buffer(`step${i}`);
  } else {
    stopMusic();
  }
  document.dispatchEvent(new CustomEvent('pf:sound'));
}

export function toggleSound(): void {
  setSound(!on);
}

function play(name: string, volume: number): void {
  if (!on || !ctx || !master || ctx.state !== 'running') return;
  const pending = buffers.get(name);
  if (!pending) {
    void buffer(name);
    return;
  }
  // Clips are tiny and warmed up front, so this almost always resolves at once.
  void pending.then((clip) => {
    if (!clip || !ctx || !master) return;
    const gain = ctx.createGain();
    gain.gain.value = volume;
    gain.connect(master);
    const source = ctx.createBufferSource();
    source.buffer = clip;
    source.connect(gain);
    source.start();
    if (name.startsWith('voice_')) voiceSource = source;
  });
}

/** The speaker's blip, restarted every couple of letters as in the game. */
export function voice(speaker: string): void {
  if (!on) return;
  try {
    voiceSource?.stop();
  } catch {
    /* already stopped */
  }
  play(`voice_${speaker.toLowerCase()}`, 0.5);
}

export function footstep(): void {
  play(`step${Math.floor(Math.random() * STEPS)}`, 0.7);
}

/** Lower the music while a conversation is open. */
export function duck(down: boolean): void {
  ducked = down;
  if (on) fadeMusic(0.2);
}

// A visitor who left sound on gets it back on their first interaction.
if (on) {
  const resume = () => {
    window.removeEventListener('pointerdown', resume);
    window.removeEventListener('keydown', resume);
    if (on) setSound(true);
  };
  window.addEventListener('pointerdown', resume);
  window.addEventListener('keydown', resume);
}

// Go quiet in a background tab.
document.addEventListener('visibilitychange', () => {
  if (!ctx) return;
  if (document.hidden) void ctx.suspend();
  else if (on) void ctx.resume();
});
