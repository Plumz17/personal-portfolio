// TypeScript port of the Truths Astray dialogue parser (vault/parser/dialogues.py).
//
// A dialogue is a Markdown file: YAML frontmatter, then one "# Section" per
// branch, each holding a three-column table: Portrait | Dialogue | Tags.
//
//   | ![[sarah_happy.png\|???]] | Oh, there you are!            | #right        |
//   | ![[astara_neutral.png]]   | Hi. → #Friendly <br>Who? → #Who | #left #choice |
//
// A choice or jump is written  text → #Section {flags} [requires] |modifiers|
//
// Differences from the game's parser, all additive:
//   - "->" is accepted as well as "→", so it can be typed in a browser.
//   - text becomes HTML instead of Godot BBCode.
//   - modifiers may carry site actions such as  |go=/archive|  (see runtime).

export interface DialogueOption {
  html: string;
  next: string;
  addFlags: string[];
  removeFlags: string[];
  requires: string[];
  modifiers: string[];
  isAction: boolean;
  isRepeatable: boolean;
}

export interface DialogueLine {
  name: string;
  alias: string;
  expression: string;
  portrait: string;
  tags: string[];
  requires: string[];
  addFlags: string[];
  removeFlags: string[];
  html: string;
  next: string;
  options?: DialogueOption[];
  randomNext?: DialogueOption[];
}

export interface Dialogue {
  id: string;
  date: string;
  repeatable: boolean;
  triggers: string[];
  flags: string[];
  sections: Record<string, DialogueLine[]>;
}

const HEADER_RE = /^#\s+(.+)$/m;
const CHOICE_RE =
  /^(.*?)(?:→|->)\s*\[?\[?#(.+?)\]?\]?(?:\s*\{(.*?)\})?(?:\s*\[(.*?)\])?(?:\s*\|(.*?)\|)?(?:<br>)*\s*$/;
const PORTRAIT_RE = /\[\[([^\]|]+)(?:\|([^\]]+))?\]?\]?/;

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Markdown emphasis to HTML. Mirrors PATTERNS in vault/parser/utils.py. */
export function markdownToHtml(text: string): string {
  const escaped: string[] = [];
  let out = text.replace(/\\([*_~=\[\]\\])/g, (_, ch: string) => {
    escaped.push(ch);
    return `\u0000${escaped.length - 1}\u0000`;
  });
  out = escapeHtml(out)
    .replace(/\*\*\*(.*?)\*\*\*/g, '<b><i>$1</i></b>')
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
    .replace(/\*(.*?)\*/g, '<i>$1</i>')
    .replace(/~~(.*?)~~/g, '<s>$1</s>')
    .replace(/={2,}(.*?)={2,}/g, '<u>$1</u>')
    .replace(/[ \t]+/g, ' ');
  return out.replace(/\u0000(\d+)\u0000/g, (_, i: string) => escapeHtml(escaped[Number(i)] ?? ''));
}

interface Frontmatter {
  [key: string]: string | string[];
}

/** Minimal YAML reader: scalars and "- item" lists, which is all the vault uses. */
function parseFrontmatter(source: string): { meta: Frontmatter; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(source);
  if (!match) return { meta: {}, body: source };
  const meta: Frontmatter = {};
  let listKey = '';
  for (const raw of (match[1] ?? '').split(/\r?\n/)) {
    const item = /^\s+-\s+(.*)$/.exec(raw);
    if (item && listKey) {
      (meta[listKey] as string[]).push(unquote(item[1] ?? ''));
      continue;
    }
    const pair = /^([\w-]+):\s*(.*)$/.exec(raw);
    if (!pair) continue;
    const key = pair[1] ?? '';
    const value = (pair[2] ?? '').trim();
    if (value === '') {
      meta[key] = [];
      listKey = key;
    } else {
      meta[key] = unquote(value);
      listKey = '';
    }
  }
  return { meta, body: source.slice(match[0].length) };
}

function unquote(value: string): string {
  return value.trim().replace(/^["']|["']$/g, '');
}

function asList(value: string | string[] | undefined): string[] {
  if (value === undefined) return [];
  const list = Array.isArray(value) ? value : [value];
  return list.map((v) => v.toLowerCase()).filter(Boolean);
}

function splitFlags(group: string | undefined): { add: string[]; remove: string[] } {
  const add: string[] = [];
  const remove: string[] = [];
  for (const raw of (group ?? '').split(',')) {
    const flag = raw.trim().toLowerCase();
    if (!flag) continue;
    if (flag.startsWith('!')) remove.push(flag.slice(1));
    else add.push(flag);
  }
  return { add, remove };
}

function styled(text: string, tags: string[]): string {
  const html = tags.includes('override') ? text : markdownToHtml(text);
  return tags.includes('thought') ? `<span class="thought">${html}</span>` : html;
}

/** Parse a choice cell: options are separated by <br>. */
function parseChoices(text: string, tags: string[]): DialogueOption[] {
  const options: DialogueOption[] = [];
  for (const choice of text.split(/<br\s*\/?>/i)) {
    const match = CHOICE_RE.exec(choice.trim());
    const label = (match ? (match[1] ?? '') : choice).trim();
    if (!label) continue;
    const flags = splitFlags(match?.[3]);
    const requires = (match?.[4] ?? '')
      .split(',')
      .map((f) => f.trim().toLowerCase())
      .filter(Boolean);
    const modifiers = (match?.[5] ?? '')
      .split(/[,|]/)
      .map((m) => m.trim())
      .filter(Boolean);
    const lower = modifiers.map((m) => m.toLowerCase());
    options.push({
      html: styled(label, tags),
      next: (match?.[2] ?? '').trim().toLowerCase(),
      addFlags: flags.add,
      removeFlags: flags.remove,
      requires,
      modifiers,
      isAction: lower.includes('action'),
      isRepeatable: lower.includes('repeatable'),
    });
  }
  return options;
}

/** "| a | b | c |" to [a, b, c], honouring "\|" as a literal pipe. */
function splitRow(row: string): string[] {
  const inner = row.trim().replace(/^\|/, '').replace(/\|$/, '');
  return inner.split(/(?<!\\)\|/).map((cell) => cell.replace(/\\\|/g, '|').trim());
}

function parsePortrait(cell: string) {
  const match = PORTRAIT_RE.exec(cell.replace(/<br\s*\/?>/gi, '').trim());
  if (!match) return { name: '', expression: '', portrait: '', alias: '' };
  const filename = (match[1] ?? '').trim();
  const alias = (match[2] ?? '').trim();
  const stem = filename.replace(/\.[^.]+$/, '');
  const cut = stem.indexOf('_');
  const name = cut === -1 ? stem : stem.slice(0, cut);
  const expression = cut === -1 ? '' : stem.slice(cut + 1);
  return { name: name.toLowerCase(), expression: expression.toLowerCase(), portrait: filename, alias };
}

function parseTags(cell: string): string[] {
  return cell
    .replace(/<br\s*\/?>/gi, ' ')
    .split(/[#\s]+/)
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);
}

function tagValues(tags: string[], prefix: string): string[] {
  return tags.filter((t) => t.startsWith(prefix)).map((t) => t.slice(prefix.length).trim());
}

function parseRows(body: string): DialogueLine[] {
  const rows = body
    .trim()
    .split(/\r?\n/)
    .filter((line) => line.trim().startsWith('|'))
    .slice(2); // header row and separator row
  const lines: DialogueLine[] = [];
  for (const row of rows) {
    const cells = splitRow(row);
    if (cells.length < 2) throw new Error(`Row needs Portrait | Dialogue | Tags: ${row.trim()}`);
    const [portraitCell = '', text = '', tagsCell = ''] = cells;
    const tags = parseTags(tagsCell);
    const line: DialogueLine = {
      ...parsePortrait(portraitCell),
      tags,
      requires: tagValues(tags, 'requires/').flatMap((v) => v.split(',')).filter(Boolean),
      addFlags: tagValues(tags, 'addflag/'),
      removeFlags: tagValues(tags, 'removeflag/'),
      html: '',
      next: '',
    };
    if (tags.includes('choice')) {
      line.options = parseChoices(text, tags);
    } else if (tags.includes('random')) {
      line.randomNext = parseChoices(text, tags);
    } else {
      const match = CHOICE_RE.exec(text);
      const spoken = match ? (match[1] ?? '').trim() : text;
      if (match) line.next = (match[2] ?? '').trim().toLowerCase();
      line.html = styled(spoken, tags);
    }
    lines.push(line);
  }
  return lines;
}

function parseSections(content: string): Record<string, DialogueLine[]> {
  const parts = content.split(new RegExp(HEADER_RE.source, 'm'));
  const sections: Record<string, DialogueLine[]> = {};
  for (let i = 1; i < parts.length; i += 2) {
    sections[(parts[i] ?? '').trim().toLowerCase()] = parseRows(parts[i + 1] ?? '');
  }
  return sections;
}

export function parseDialogue(id: string, source: string): Dialogue {
  const { meta, body } = parseFrontmatter(source);
  const sections = parseSections(body);
  if (!sections.start) throw new Error('A dialogue needs a "# Start" section.');
  return {
    id: id.toLowerCase(),
    date: typeof meta.date === 'string' ? meta.date : '',
    repeatable: String(meta.repeatable ?? 'false').toLowerCase() === 'true',
    triggers: asList(meta.triggers),
    flags: asList(meta.flags),
    sections,
  };
}
