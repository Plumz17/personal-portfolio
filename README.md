# personal-portfolio

Portfolio site for Anders Emmanuel Tan: games, software and AI/ML projects, with the code and numbers behind them.

Built with [Astro](https://astro.build) and TypeScript. Static output, no backend.

## Run it

```
npm install
npm run dev        # http://localhost:4321/personal-portfolio/
npm run build      # type-check, then build to dist/
npm run preview    # serve the built site
```

## Add a project

Create one Markdown file in `src/content/projects/`. The file name becomes the URL (`my-game.md` → `/work/my-game`).

```md
---
title: My Game
tagline: One sentence on what it is and why it is interesting.
tier: project            # "flagship" for a full case study on the home page
order: 12                # position within its tier
disciplines: [games]     # any of: games, software, ai
year: '2027'
context: What it was made for
role: What I did
team: Solo
stack: [Godot 4, GDScript]
share: { mine: 40, total: 100, unit: commits }   # optional
stats:                                            # optional, up to four
  - { value: '12', label: 'levels' }
links:
  - { label: Play on itch.io, href: 'https://…' }
cover: ../../assets/shots/my-game/cover.png       # optional
coverAlt: What the image shows
credits: Who else built what.                     # optional
---

## What it is

Body text in Markdown.
```

That is all. The home page, archive, search and the guide read from these files; no layout code changes. The full list of fields is in `src/content.config.ts`.

Smaller things that do not need a page (coursework, experiments) go in `src/data/archive.ts`, one object each.

## Where things are

| Path | What it holds |
|---|---|
| `src/content/projects/` | One Markdown file per project |
| `src/content/dialogue/` | The guide's conversations, in the Truths Astray table format |
| `src/data/profile.ts` | Name, links, education, roles, awards, skills |
| `src/data/archive.ts` | The long tail of small projects |
| `src/assets/shots/` | Screenshots (optimised at build time) |
| `public/media/` | Sprite sheets and UI art used by the interactive pieces |
| `src/components/toys/` | Interactive demos, one file each |
| `src/lib/dialogue/` | Dialogue parser, runtime and renderer |
| `src/styles/global.css` | Colours, type and shared components |

## Add an interactive demo

1. Create `src/components/toys/MyDemo.astro`.
2. Register it in `src/components/toys/registry.ts`.
3. Set `toy: my-demo` in the project's frontmatter.

## Edit what the guide says

Each file in `src/content/dialogue/` is one conversation. `triggers` in the frontmatter decide when it is eligible; when several are, the one with the most triggers plays. Page flags such as `at-home` and `at-project` are set by each page, and `seen-<project>` is remembered once a project has been opened.

A choice is written `text → #Section {flags} [requires] \|action\|`. Actions the site understands: `go=/path`, `filter=games|software|ai|all`, `scroll=<element id>`, `next`, `terminal`.

## Deploy

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main` (repository settings → Pages → Source: GitHub Actions).

`astro.config.mjs` sets `base: '/personal-portfolio'` to match `plumz17.github.io/personal-portfolio`. If the site moves to a custom domain, change `site` and set `base` to `/`.

## Source material

`references/` holds the original game projects used for research. It is git-ignored and must stay that way: copy individual assets into `public/media/` or `src/assets/` when the site needs them.
