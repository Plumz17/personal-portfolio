// Browser-side state shared by the filter, the guide and the terminal.
// Stored in localStorage; every read is guarded so the site works without it.

import type { FlagStore } from './dialogue/runtime';
import type { Discipline } from './site';

const KEY = 'pf.state.v1';
const ALL: Discipline[] = ['games', 'software', 'ai'];

interface Saved {
  flags: string[];
  done: string[];
  off: Discipline[];
  theme?: 'day' | 'dusk';
  /** Where Astara stood in the hallway, and which way they faced. */
  hall?: HallSpot;
}

export interface HallSpot {
  x: number;
  facing: 1 | -1;
}

function load(): Saved {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { flags: [], done: [], off: [], ...JSON.parse(raw) };
  } catch {
    /* storage unavailable */
  }
  return { flags: [], done: [], off: [] };
}

const saved = load();
const transient = new Set<string>();

function save(): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(saved));
  } catch {
    /* storage unavailable */
  }
}

function emit(name: string): void {
  document.dispatchEvent(new CustomEvent(name));
}

// --- Flags (dialogue memory) -------------------------------------------------

export const flags: FlagStore & { setTransient(flag: string, on?: boolean): void } = {
  has: (flag) => transient.has(flag) || saved.flags.includes(flag),
  set(flag) {
    if (!saved.flags.includes(flag)) {
      saved.flags.push(flag);
      save();
    }
  },
  clear(flag) {
    saved.flags = saved.flags.filter((f) => f !== flag);
    save();
  },
  isCompleted: (id) => saved.done.includes(id),
  markCompleted(id) {
    if (!saved.done.includes(id)) {
      saved.done.push(id);
      save();
    }
  },
  /** Flags that describe the current page; never written to storage. */
  setTransient(flag, on = true) {
    if (on) transient.add(flag);
    else transient.delete(flag);
  },
};

export function resetMemory(): void {
  saved.flags = [];
  saved.done = [];
  delete saved.hall;
  save();
}

// --- Hallway ------------------------------------------------------------------

export function hallSpot(): HallSpot | null {
  const spot = saved.hall;
  return spot && Number.isFinite(spot.x) ? spot : null;
}

export function saveHallSpot(spot: HallSpot): void {
  const x = Math.round(spot.x);
  if (saved.hall?.x === x && saved.hall.facing === spot.facing) return;
  saved.hall = { x, facing: spot.facing };
  save();
}

// --- Masks (discipline filter) ----------------------------------------------

export function isOn(d: Discipline): boolean {
  return !saved.off.includes(d);
}

export function activeMasks(): Discipline[] {
  return ALL.filter(isOn);
}

export function setMasks(on: Discipline[]): void {
  saved.off = ALL.filter((d) => !on.includes(d));
  save();
  emit('pf:masks');
}

export function toggleMask(d: Discipline): void {
  setMasks(isOn(d) ? activeMasks().filter((x) => x !== d) : [...activeMasks(), d]);
}

/** Show only one discipline; calling it again on the same one restores all. */
export function soloMask(d: Discipline): void {
  const active = activeMasks();
  setMasks(active.length === 1 && active[0] === d ? ALL : [d]);
}

// --- Theme --------------------------------------------------------------------

export function theme(): 'day' | 'dusk' {
  return document.documentElement.dataset.theme === 'dusk' ? 'dusk' : 'day';
}

export function setTheme(next: 'day' | 'dusk'): void {
  document.documentElement.dataset.theme = next;
  saved.theme = next;
  save();
  emit('pf:theme');
}

export function toggleTheme(): void {
  setTheme(theme() === 'dusk' ? 'day' : 'dusk');
}

export const reducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Deployment base path, written on <html data-base> by the layout. */
export const basePath = (): string => document.documentElement.dataset.base ?? '';
