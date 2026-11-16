---
title: Truths Astray
tagline: A newsroom game set in 2083, where writers script every conversation in Markdown and my pipeline turns it into playable, branching dialogue.
tier: flagship
order: 1
disciplines: [games, software]
year: '2026'
context: GEMASTIK 2026 entry. Passed Liga KOMATIK, UGM's internal selection.
role: Gameplay programmer and artist
team: Team of 7
stack: [Godot 4, GDScript, Python, Obsidian, JSON]
share:
  mine: 167
  total: 314
  unit: commits
  note: Most on the team. By lines of script I wrote about 1,350 of 4,600; the pinboard, typewriter and article systems are R. Ethan Halim's.
stats:
  - { value: '167', label: 'of 314 commits' }
  - { value: '23', label: 'dialogue files parsed' }
  - { value: '2', label: 'languages: Python to GDScript' }
cover: ../../assets/shots/truths-astray/dialogue.png
coverAlt: Sarah speaking to Astara in the office, through the dialogue system.
gallery:
  - { src: ../../assets/shots/truths-astray/title.png, alt: Title screen with a terminal, typewriter and pinboard. }
  - { src: ../../assets/shots/truths-astray/office.png, alt: Astara in the office next to the terminal and pinboard. }
  - { src: ../../assets/shots/truths-astray/bedroom.png, alt: Astara in the dormitory room on the first day. }
  - { src: ../../assets/shots/truths-astray/pinboard.png, alt: The pinboard with two articles pinned. }
toy: dialogue-lab
credits: Pinboard, typewriter, article snippets, shaders and most of the home-floor scene by R. Ethan Halim. Most story and article writing by A4R0NMan. Character portraits drawn with my sister.
status: In development, not yet public
---

## What it is

You play Astara, a new hire at a government newsroom in the city of Navaport. Each day you search wire articles on a terminal, pin and connect them on a board, then type the headline the public will read. Reputation, obedience and readership move with what you choose to print.

The game is conversation-heavy: six characters, branching scenes, tutorials that trigger the first time you open each tool. That made dialogue the system everything else waits on.

## What I built

- **The whole dialogue pipeline**, from authoring format to runtime.
- **The NPC system**: who can be talked to, which conversation they offer, which way they face.
- The first version of **Astara's movement** and camera.
- About half of the **terminal** (query handling, typed output, print locking) and a third of the **article loader**.
- Astara's sprites, the input icons, furniture and HUD bars.

## Engineering notes

### Writers never open the engine

Dialogue lives in an Obsidian vault as plain Markdown tables. One file is one conversation, one heading is one branch, one row is one line.

```
| Portrait                  | Dialogue                                   | Tags          |
| ![[sarah_happy.png\|???]] | Oh, there you are!                         | #right        |
| ![[astara_neutral.png]]   | Nice to meet you. → #Friendly <br>Where are we? → #Where | #left #choice |
```

A Python parser reads the vault and emits one JSON file the game loads at start. Writers see portraits inline in Obsidian and can restructure a scene without a programmer.

### One line of syntax carries the logic

A choice can set flags, require flags and carry modifiers, all in the cell the writer is already typing in:

```
Ask about the roach → #Pablo {met-pablo, !shy} [flag-article-pabloread] |Repeatable|
```

The parser splits that with a single regular expression into the label, the target section, flags to add or remove, requirements, and modifiers. Speaker name and expression come from the portrait filename, so `sarah_happy.png` needs no extra columns.

### The most specific conversation wins

An NPC can have several conversations ready at once. The runtime picks the one whose triggers are all met and that has the **most** triggers, so a scene written for a specific situation always beats a general one, and writers never have to order them by hand.

```gdscript
if best == null or dlg.triggers.size() > best.triggers.size():
    best = dlg
```

Lines whose requirements are not met are skipped, choices are filtered the same way, and `not-` prefixes handle the inverse.

### Why it mattered

Most of the script was written by one teammate. Keeping dialogue out of the engine meant story and code could change at the same time without touching the same files.

## Try it

The box below runs a TypeScript port of the same parser and runtime. Edit the table and the conversation changes as you type.
