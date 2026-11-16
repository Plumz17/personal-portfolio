// TypeScript port of the Truths Astray runtime (ui/dialogue/dialogue_manager.gd).
// Same rules as the game: lines whose requirements are unmet are skipped,
// choices are filtered by requirement, flags are set as lines play, and
// resolve() picks the eligible dialogue with the most triggers.

import type { Dialogue, DialogueLine, DialogueOption } from './parser';

export interface FlagStore {
  has(flag: string): boolean;
  set(flag: string): void;
  clear(flag: string): void;
  isCompleted(id: string): boolean;
  markCompleted(id: string): void;
}

export interface RunnerEvents {
  onLine(line: DialogueLine): void;
  onChoice(line: DialogueLine, options: DialogueOption[]): void;
  onFinish(id: string): void;
  /** Site extension: a chosen option carried modifiers such as "go=/archive". */
  onModifiers?(modifiers: string[]): void;
}

export function meetsTriggers(triggers: string[], flags: FlagStore): boolean {
  for (const t of triggers) {
    if (t.startsWith('not-')) {
      if (flags.has(t.slice(4))) return false;
    } else if (!flags.has(t)) {
      return false;
    }
  }
  return true;
}

/** Most specific eligible dialogue wins: the one with the most triggers. */
export function resolveDialogue(candidates: Dialogue[], flags: FlagStore): Dialogue | null {
  let best: Dialogue | null = null;
  for (const dlg of candidates) {
    if (!meetsTriggers(dlg.triggers, flags)) continue;
    if (flags.isCompleted(dlg.id) && !dlg.repeatable) continue;
    if (best === null || dlg.triggers.length > best.triggers.length) best = dlg;
  }
  return best;
}

export class DialogueRunner {
  private dialogue: Dialogue | null = null;
  private section = 'start';
  private index = 0;
  private skipCompletion = false;

  constructor(
    private readonly flags: FlagStore,
    private readonly events: RunnerEvents,
  ) {}

  get active(): boolean {
    return this.dialogue !== null;
  }

  start(dialogue: Dialogue): void {
    this.dialogue = dialogue;
    this.section = 'start';
    this.index = 0;
    this.skipCompletion = false;
    this.showCurrentLine();
  }

  stop(): void {
    this.dialogue = null;
  }

  advance(): void {
    if (!this.dialogue) return;
    const lines = this.dialogue.sections[this.section] ?? [];
    const line = lines[this.index];
    if (!line || line.tags.includes('choice')) return;
    if (line.next) {
      this.section = line.next;
      this.index = 0;
    } else {
      this.index += 1;
    }
    this.showCurrentLine();
  }

  choose(option: DialogueOption): void {
    if (!this.dialogue) return;
    if (option.isRepeatable) this.skipCompletion = true;
    option.addFlags.forEach((f) => this.flags.set(f));
    option.removeFlags.forEach((f) => this.flags.clear(f));
    if (option.modifiers.length) this.events.onModifiers?.(option.modifiers);
    if (!this.dialogue) return; // a modifier may have closed the dialogue
    this.section = option.next;
    this.index = 0;
    this.showCurrentLine();
  }

  private showCurrentLine(): void {
    const dialogue = this.dialogue;
    if (!dialogue) return;
    const lines = dialogue.sections[this.section] ?? [];
    while (this.index < lines.length && !meetsTriggers(lines[this.index]!.requires, this.flags)) {
      this.index += 1;
    }

    if (this.index >= lines.length) {
      this.dialogue = null;
      if (!this.skipCompletion) this.flags.markCompleted(dialogue.id);
      dialogue.flags.forEach((f) => this.flags.set(f));
      this.events.onFinish(dialogue.id);
      return;
    }

    const line = { ...lines[this.index]! };
    line.addFlags.forEach((f) => this.flags.set(f));
    line.removeFlags.forEach((f) => this.flags.clear(f));

    if (line.tags.includes('random') && line.randomNext?.length) {
      const pool = line.randomNext.filter((o) => meetsTriggers(o.requires, this.flags));
      const pick = pool[Math.floor(Math.random() * pool.length)];
      if (pick) {
        pick.addFlags.forEach((f) => this.flags.set(f));
        pick.removeFlags.forEach((f) => this.flags.clear(f));
        line.html = pick.html;
        line.next = pick.next;
        lines[this.index] = { ...lines[this.index]!, next: pick.next };
      }
    }

    if (line.tags.includes('choice')) {
      const visible = (line.options ?? []).filter((o) => meetsTriggers(o.requires, this.flags));
      this.events.onChoice(line, visible);
    } else {
      this.events.onLine(line);
    }
  }
}
