// Content model. To add a project, drop a Markdown file into
// src/content/projects/ with this frontmatter. Nothing else needs to change:
// the home page, project index, terminal search and guide all read from here.

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const discipline = z.enum(['games', 'software', 'ai']);

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** One sentence: what it is and why it is interesting. */
      tagline: z.string(),
      /** flagship = full case study on the home page; project = shorter page. */
      tier: z.enum(['flagship', 'project']),
      /** Sort order within the tier, lowest first. */
      order: z.number(),
      disciplines: z.array(discipline).min(1),
      year: z.string(),
      /** Course, competition or jam it was made for. */
      context: z.string(),
      role: z.string(),
      team: z.string(),
      stack: z.array(z.string()),
      /** My share of the work, from git history. Omit when it cannot be measured. */
      share: z
        .object({
          mine: z.number(),
          total: z.number(),
          unit: z.string(),
          note: z.string().optional(),
        })
        .optional(),
      /** Up to four headline numbers. */
      stats: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
      links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
      cover: image().optional(),
      coverAlt: z.string().default(''),
      /** True for low-resolution pixel art that must not be smoothed. */
      coverPixel: z.boolean().default(false),
      gallery: z
        .array(z.object({ src: image(), alt: z.string(), pixel: z.boolean().default(false) }))
        .default([]),
      /** What teammates built, so my part is never overstated. */
      credits: z.string().optional(),
      status: z.string().optional(),
    }),
});

export const collections = { projects };
