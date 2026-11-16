// DOM renderer for a dialogue: portrait, name, typewriter text, choices.
// Used by the site guide for Dorothy and the hallway characters.

import type { DialogueLine, DialogueOption } from './parser';

export interface PortraitSource {
  src: string;
  /** Source rectangle [x, y, w, h] when the portrait is cut from a sprite sheet. */
  crop?: [number, number, number, number];
}

export interface ViewOptions {
  resolvePortrait(line: DialogueLine): PortraitSource | null;
  onAdvance(): void;
  onChoose(option: DialogueOption): void;
  instant?: boolean;
  /** Called every second visible letter with the speaker's name, for a voice blip. */
  onBlip?(speaker: string): void;
}

const CHAR_MS = 18;
const images = new Map<string, HTMLImageElement>();

function loadImage(src: string): Promise<HTMLImageElement> {
  const cached = images.get(src);
  if (cached?.complete) return Promise.resolve(cached);
  return new Promise((resolve, reject) => {
    const img = cached ?? new Image();
    img.addEventListener('load', () => resolve(img), { once: true });
    img.addEventListener('error', reject, { once: true });
    if (!cached) {
      img.src = src;
      images.set(src, img);
    }
  });
}

export class DialogueView {
  readonly root: HTMLElement;
  private readonly portrait: HTMLCanvasElement;
  private readonly nameEl: HTMLElement;
  private readonly textEl: HTMLElement;
  private readonly liveEl: HTMLElement;
  private readonly choicesEl: HTMLElement;
  private readonly nextBtn: HTMLButtonElement;
  private timer = 0;
  private typing = false;
  private speaker = '';

  constructor(
    container: HTMLElement,
    private readonly opts: ViewOptions,
  ) {
    container.innerHTML = `
      <div class="dlg" data-side="left">
        <canvas class="dlg-portrait" width="170" height="170" aria-hidden="true"></canvas>
        <div class="dlg-body">
          <div class="dlg-name"></div>
          <div class="dlg-text" aria-hidden="true"></div>
          <div class="sr-only" aria-live="polite"></div>
          <div class="dlg-choices"></div>
          <button type="button" class="dlg-next" hidden>next ▼</button>
        </div>
      </div>`;
    this.root = container.querySelector('.dlg')!;
    this.portrait = container.querySelector('.dlg-portrait')!;
    this.nameEl = container.querySelector('.dlg-name')!;
    this.textEl = container.querySelector('.dlg-text')!;
    this.liveEl = container.querySelector('[aria-live]')!;
    this.choicesEl = container.querySelector('.dlg-choices')!;
    this.nextBtn = container.querySelector('.dlg-next')!;

    const advance = () => this.submit();
    this.textEl.addEventListener('click', advance);
    this.nextBtn.addEventListener('click', advance);
  }

  /** Same rule as the game: a press while typing finishes the line first. */
  submit(): void {
    if (this.typing) this.finishTyping();
    else if (!this.choicesEl.childElementCount) this.opts.onAdvance();
  }

  showLine(line: DialogueLine): void {
    this.setSpeaker(line);
    this.choicesEl.replaceChildren();
    this.type(line.html, () => {
      this.nextBtn.hidden = false;
    });
  }

  showChoices(line: DialogueLine, options: DialogueOption[]): void {
    this.finishTyping();
    // A choice row with its own portrait is that character deciding, so the
    // box switches to them. Without one, the question just asked stays up.
    if (line.name) {
      this.setSpeaker(line);
      this.textEl.replaceChildren();
    }
    this.liveEl.textContent = `${this.textEl.textContent ?? ''} Choose a reply.`.trim();
    this.nextBtn.hidden = true;
    this.choicesEl.replaceChildren(
      ...options.map((option) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.innerHTML = option.html;
        button.addEventListener('click', () => this.opts.onChoose(option));
        return button;
      }),
    );
  }

  focus(): void {
    const target = this.choicesEl.querySelector('button') ?? this.nextBtn;
    (target as HTMLElement).focus({ preventScroll: true });
  }

  clear(): void {
    this.stopTyping();
    this.textEl.replaceChildren();
    this.choicesEl.replaceChildren();
    this.nameEl.textContent = '';
    this.nextBtn.hidden = true;
  }

  private setSpeaker(line: DialogueLine): void {
    const name = line.alias || (line.name ? line.name[0]!.toUpperCase() + line.name.slice(1) : '');
    this.nameEl.textContent = name;
    this.root.dataset.side = line.tags.includes('right') ? 'right' : 'left';
    this.speaker = line.name ?? '';
    void this.drawPortrait(line);
  }

  private async drawPortrait(line: DialogueLine): Promise<void> {
    const source = this.opts.resolvePortrait(line);
    const ctx = this.portrait.getContext('2d');
    if (!source || !ctx) {
      this.portrait.hidden = true;
      return;
    }
    try {
      const img = await loadImage(source.src);
      const [sx, sy, sw, sh] = source.crop ?? [0, 0, img.naturalWidth, img.naturalHeight];
      // The canvas takes the art's own pixel size, so the portrait is copied
      // one to one: a centred square from the top of the source.
      const side = Math.min(sw, sh);
      this.portrait.width = side;
      this.portrait.height = side;
      ctx.imageSmoothingEnabled = false;
      ctx.fillStyle = '#cfc59c';
      ctx.fillRect(0, 0, side, side);
      ctx.drawImage(img, sx + (sw - side) / 2, sy, side, side, 0, 0, side, side);
      this.portrait.hidden = false;
    } catch {
      this.portrait.hidden = true;
    }
  }

  private type(html: string, done: () => void): void {
    this.stopTyping();
    this.nextBtn.hidden = true;
    this.textEl.innerHTML = html;
    this.liveEl.textContent = this.textEl.textContent;

    // Wrap every character so it can be revealed without reflowing the line.
    const chars: HTMLElement[] = [];
    const walker = document.createTreeWalker(this.textEl, NodeFilter.SHOW_TEXT);
    const textNodes: Text[] = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode as Text);
    for (const node of textNodes) {
      const frag = document.createDocumentFragment();
      for (const ch of node.data) {
        const span = document.createElement('span');
        span.className = 'ch off';
        span.textContent = ch;
        frag.append(span);
        chars.push(span);
      }
      node.replaceWith(frag);
    }

    this.onTyped = done;
    if (this.opts.instant || chars.length === 0) {
      this.finishTyping();
      return;
    }
    this.typing = true;
    let i = 0;
    this.timer = window.setInterval(() => {
      const ch = chars[i];
      ch?.classList.remove('off');
      i += 1;
      if (i % 2 === 0 && this.speaker && ch?.textContent?.trim()) this.opts.onBlip?.(this.speaker);
      if (i >= chars.length) this.finishTyping();
    }, CHAR_MS);
  }

  private onTyped: () => void = () => {};

  private finishTyping(): void {
    this.stopTyping();
    this.textEl.querySelectorAll('.ch.off').forEach((el) => el.classList.remove('off'));
    this.onTyped();
  }

  private stopTyping(): void {
    window.clearInterval(this.timer);
    this.typing = false;
  }
}
