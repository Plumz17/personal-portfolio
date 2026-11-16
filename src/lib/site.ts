// Shared, build-time helpers. Everything that needs to know the three
// disciplines or the site's base path goes through this file.

export const DISCIPLINES = {
  games: { label: 'Games', short: 'G', key: '1', blurb: 'Gameplay, systems, tools' },
  software: { label: 'Software', short: 'S', key: '2', blurb: 'APIs, web apps, pipelines' },
  ai: { label: 'AI / ML', short: 'A', key: '3', blurb: 'Vision, NLP, classical ML' },
} as const;

export type Discipline = keyof typeof DISCIPLINES;
export const DISCIPLINE_KEYS = Object.keys(DISCIPLINES) as Discipline[];

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix an internal path with the deployment base (GitHub Pages subfolder). */
export function url(path = ''): string {
  if (/^(https?:|mailto:|#)/.test(path)) return path;
  return `${base}/${path.replace(/^\//, '')}`;
}

/** Path to a file in public/media. */
export function media(path: string): string {
  return url(`media/${path.replace(/^\//, '')}`);
}
