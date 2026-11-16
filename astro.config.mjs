import { defineConfig } from 'astro/config';

// `site` + `base` match GitHub Pages for github.com/Plumz17/personal-portfolio.
// If the site moves to a custom domain or a user page, set base to '/'.
export default defineConfig({
  site: 'https://plumz17.github.io',
  base: '/personal-portfolio',
  build: { format: 'directory' },
});
