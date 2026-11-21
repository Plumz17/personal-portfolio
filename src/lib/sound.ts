// Music from Phase Reveal, voices and footsteps from Truths Astray. Off by
// default. Browsers only allow audio after
// a click or key press, so nothing plays until the visitor turns it on (or,
// if they turned it on last visit, until their first interaction).

import { activeMasks, basePath } from './state';
import type { Discipline } from './site';

const KEY = 'pf.sound';
const MUSIC_VOLUME = 0.45;
const DUCKED = 0.32; // the game drops the music by 10 dB while someone talks
const STEPS = 5;

// Phase Reveal's music works like its masks: a base loop always plays, and a
// red, green and blue layer play in lockstep with it, each at -20 dB until its
// mask is on, then up to full over a quarter of a second. The site's masks are
// the same three colours: Games red, Software green, AI / ML blue.
const LAYERS: Record<Discipline, string> = { games: 'red', software: 'green', ai: 'blue' };
const LAYER_ON = 1; // 0 dB
const LAYER_OFF = 0.1; // -20 dB
const LAYER_FADE = 0.25; // seconds
// Browsers without Ogg Vorbis decoding (older Safari) get the single
// Truths Astray track instead.
const FALLBACK = 'truths-astray/audio/weed_astray.mp3';

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let musicGain: GainNode | null = null;
let musicSources: AudioBufferSourceNode[] = [];
const layerGains = new Map<Discipline, GainNode>();
let starting = false;
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

const src = (name: string): string =>
  `${basePath()}/media/${name.includes('/') ? name : `truths-astray/audio/${name}.mp3`}`;

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

const layerLevel = (d: Discipline): number => (activeMasks().includes(d) ? LAYER_ON : LAYER_OFF);

async function startMusic(): Promise<void> {
  if (!ctx || !musicGain || musicSources.length || starting) return;
  starting = true;
  const names = ['loop', ...Object.values(LAYERS)].map((n) => `phase-reveal/audio/${n}.ogg`);
  let tracks = await Promise.all(names.map(buffer));
  if (tracks.some((t) => !t)) tracks = [await buffer(FALLBACK)];
  starting = false;
  if (!tracks[0] || !on || musicSources.length) return;

  // One start time for every layer, so they loop together sample for sample.
  const at = ctx.currentTime + 0.05;
  const keys = Object.keys(LAYERS) as Discipline[];
  musicSources = tracks.map((track, i) => {
    const source = ctx!.createBufferSource();
    source.buffer = track;
    source.loop = true;
    if (i === 0) {
      source.connect(musicGain!);
    } else {
      const d = keys[i - 1]!;
      const gain = ctx!.createGain();
      gain.gain.value = layerLevel(d);
      gain.connect(musicGain!);
      source.connect(gain);
      layerGains.set(d, gain);
    }
    source.start(at);
    return source;
  });
  fadeMusic(1.2);
}

/** Bring each layer up or down to match its mask, as the game's tween does. */
function fadeLayers(): void {
  if (!ctx) return;
  const now = ctx.currentTime;
  layerGains.forEach((gain, d) => {
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(gain.gain.value, now);
    // The game tweens in decibels, which is an exponential ramp in gain.
    gain.gain.exponentialRampToValueAtTime(layerLevel(d), now + LAYER_FADE);
  });
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
  if (!ctx || !musicSources.length) return;
  const sources = musicSources;
  musicSources = [];
  layerGains.clear();
  fadeMusic(0.4);
  const at = ctx.currentTime + 0.45;
  sources.forEach((source) => source.stop(at));
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

document.addEventListener('pf:masks', fadeLayers);

// Go quiet in a background tab.
document.addEventListener('visibilitychange', () => {
  if (!ctx) return;
  if (document.hidden) void ctx.suspend();
  else if (on) void ctx.resume();
});
