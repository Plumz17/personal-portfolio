---
title: 31 Days
tagline: A school-life RPG with turn-based dungeon combat, built almost single-handed in Unity over one summer.
tier: flagship
order: 2
disciplines: [games]
year: '2025'
context: GEMASTIK XVIII entry, Game Development division
role: Programmer, writer, artist
team: Team of 4
stack: [Unity, C#, ScriptableObjects, Timeline, URP 2D]
share:
  mine: 365
  total: 391
  unit: commits
  note: A teammate prototyped an early battle scene; I rebuilt combat in July 2025.
stats:
  - { value: '67', label: 'C# scripts' }
  - { value: '3,970', label: 'lines of C#' }
  - { value: '21', label: 'scenes' }
cover: ../../assets/shots/31-days/shot-2.png
coverAlt: Satria in a classroom while Diah speaks through the dialogue box.
gallery:
  - { src: ../../assets/shots/31-days/shot-1.png, alt: 31 Days gameplay screenshot. }
  - { src: ../../assets/shots/31-days/shot-3.png, alt: 31 Days gameplay screenshot. }
  - { src: ../../assets/shots/31-days/shot-4.png, alt: 31 Days gameplay screenshot. }
  - { src: ../../assets/shots/31-days/shot-5.png, alt: 31 Days gameplay screenshot. }
links:
  - { label: Play on itch.io, href: 'https://plumz17.itch.io/31-days' }
  - { label: Source on GitHub, href: 'https://github.com/Plumz17/31-days' }
credits: Music, dialogue portraits and playtesting by teammates.
status: Playable prototype
---

## What it is

Satria is the new student at Tunas High in Yogyakarta, with 31 days to leave the school better than he found it. By day he talks to classmates and learns what is weighing on them. At dusk the school turns into the Dusk Zone, where those problems walk around as creatures and are fought in turn-based battles.

## What I built

Nearly all of the code, the story, and most of the art.

- A **node-based dialogue system** authored as Unity assets.
- **Turn-based combat**: party, enemies, skills, a defend and run action, encounter data.
- A **calendar and objective system** with four time blocks per day.
- **Save and load** to JSON, including relationship levels and party.
- **Cutscenes** on Unity Timeline with a skip control and typewriter captions.
- Room transitions, a parallax camera, an audio manager, pause and main menus.

## Engineering notes

### Dialogue nodes drive the whole game

Each line of dialogue is a `ScriptableObject`. Besides text and a portrait, a node carries flags, and the dialogue manager acts on them the moment the node starts:

```csharp
if (node.levelUpFlag && !string.IsNullOrEmpty(node.characterName))
    PlayerDataManager.instance.IncreaseConnection(node.characterName);

if (node.advanceTimeFlag != 0)
    CalenderAndObjectiveManager.instance.AdvanceTimeBlock(node.advanceTimeFlag);

if (node.saveDataFlag)
    SaveData.Save();
```

That one decision made the story the scheduler. Befriending someone, ending the afternoon, recruiting a party member and saving the game are all things a conversation does, so new story days could be written without new code.

### Time is plain arithmetic

A day is four blocks: morning, day, evening, night. Advancing by any number of blocks is integer division and remainder, and anything tagged as time-dependent refreshes itself afterwards.

```csharp
int totalBlocks = (int)currentTimeOfDay + blockAdvanced;
int dayPassed = totalBlocks / 4;
int newBlock = totalBlocks % 4;
```

### Data-driven combat

Characters, enemies, skills and encounters are separate assets sharing a `UnitData` base. A new enemy or a new fight is a new asset in the editor, not a code change.

## Outcome

Submitted to GEMASTIK XVIII and to Liga KOMATIK. The build on itch.io runs in the browser.
