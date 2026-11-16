---
title: Phase Reveal
tagline: A 48-hour puzzle platformer about colour masks that cancel each other out. Jury's choice at Global Game Jam Solo 2026.
tier: flagship
order: 4
disciplines: [games]
year: '2026'
context: Global Game Jam 2026, Solo (Surakarta) site. Theme, Mask.
role: Gameplay programmer and artist
team: Team ScuTI, 6 credited
stack: [Godot 4, GDScript]
share:
  mine: 51
  total: 169
  unit: commits
  note: I wrote the player controller and nearly all menus and flow. The mask system and shaders are a teammate's.
stats:
  - { value: '48 h', label: 'start to submission' }
  - { value: '189', label: 'of 263 lines in the player controller' }
  - { value: '62', label: 'of 98 art commits' }
cover: ../../assets/shots/phase-reveal/shot-2.png
coverAlt: Comic panels from the intro, a monkey holding a white mask.
coverPixel: true
gallery:
  - { src: ../../assets/shots/phase-reveal/shot-1.png, alt: 'Title screen with a slanted menu beside the half-masked monkey logo.', caption: 'The slanted title menu, laid out by the custom container.', beside: Custom layout containers, pixel: true }
  - { src: ../../assets/shots/phase-reveal/shot-3.png, alt: 'A level of red, green and blue platforms with the three masks in the corner.', caption: 'Level 3. The three masks, top right, switch each colour plane on or off.', beside: What it is, pixel: true }
  - { src: ../../assets/shots/phase-reveal/shot-4.png, alt: 'The monkey carrying a weight cube through a green plane.', caption: 'Carrying a weight cube in level 4.', beside: A controller that forgives, pixel: true }
  - { src: ../../assets/shots/phase-reveal/shot-5.png, alt: 'Level 5, where a blue and a red platform overlap in the middle.', caption: 'Level 5. Where the blue and red platforms overlap, they cancel out.', beside: What it is, pixel: true }
  - { src: ../../assets/shots/ggj-solo-2026.png, alt: 'Award certificate naming Team ScuTI and Phase Reveal as jury’s choice best game.', caption: 'The certificate from Global Game Jam Solo 2026.', beside: Outcome }
links:
  - { label: Play on itch.io, href: 'https://avtne.itch.io/phase-reveal' }
  - { label: Source on GitHub, href: 'https://github.com/avtne/phase-reveal' }
credits: The mask and platform system, shaders and colour-blind modes, level design, music and sound, and additional art are teammates' work.
status: Released
hook: A controller that forgives
feature: pair
---

## What it is

Platforms exist in three colour planes: red, green and blue. A lab monkey wears masks that switch each plane on or off, and where two contrasting platforms overlap they cancel into nothing. You escape the facility by deciding what exists.

## What I built

- **The player controller**, including carrying and dropping weight cubes.
- **Title screen, level select and pause menu**, and their animations.
- **Intro and outro comics**, and the scene flow between them and the levels.
- **Save system** for level progress, added after the jam along with new levels.
- **Parallax backgrounds**, walking and jumping particles, death and restart.
- Most of the art: the monkey's animations, backgrounds, buttons.

## Engineering notes

### A controller that forgives

A jam platformer is judged in its first ten seconds, so the controller got the three assists that make a jump feel fair.

- **Coyote time**: for 0.1 s after walking off a ledge, a jump still counts.
- **Jump buffering**: a press up to 0.1 s before landing fires on touchdown.
- **Variable height**: releasing the button early multiplies gravity by 1.2 to cut the jump short.

```gdscript
if velocity.y < 0 and Input.is_action_just_released("jump"):
    current_gravity = default_gravity * gravity_modifier
```

Every value is an exported variable grouped by feature, so feel can be tuned from the editor without opening the script. A debug label over the monkey prints both timers live.

### Saves that survive a changing level list

After the jam we kept adding levels. The save system I wrote then tolerates the level list growing or shrinking, so a new level does not invalidate existing progress.

### Custom layout containers

The slanted title menu is a small custom `Container` that offsets each child diagonally. It comes from my Godot utilities repo, and I used it again in Situs Tertinggal.

## Outcome

**Game Terbaik Pilihan Juri** (jury's choice for best game) at Global Game Jam Solo 2026, held over 48 hours at Solo Technopark, Surakarta.
