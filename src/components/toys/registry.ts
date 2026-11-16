// Interactive components a project can attach with `toy: <id>` in its
// frontmatter. To add one: create the .astro file here and register it below.

import CropVote from './CropVote.astro';
import DiagonalMenu from './DiagonalMenu.astro';
import DialogueLab from './DialogueLab.astro';
import JumpLab from './JumpLab.astro';
import NodeInspector from './NodeInspector.astro';

type AstroComponent = (props: Record<string, never>) => unknown;

export const toys: Record<string, AstroComponent> = {
  'dialogue-lab': DialogueLab as AstroComponent,
  'jump-lab': JumpLab as AstroComponent,
  'node-inspector': NodeInspector as AstroComponent,
  'crop-vote': CropVote as AstroComponent,
  'diagonal-menu': DiagonalMenu as AstroComponent,
};
