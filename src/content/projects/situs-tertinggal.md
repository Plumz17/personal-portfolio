---
title: Situs Tertinggal
tagline: A tower defence where you are the haunted house, placing Indonesian folklore ghosts to frighten ghost hunters back out the door.
tier: flagship
order: 5
disciplines: [games]
year: '2026'
context: Final project, Codelamp 2D Godot Game Development Bootcamp
role: Programmer and artist
team: Team of 6
stack: [Godot 4, GDScript]
share:
  mine: 47
  total: 142
  unit: commits
  note: I set up the shared foundation and built the menus. Wave spawning and the main game loop are Hazard-Nico's; room interactions are Qin's.
stats:
  - { value: '3', label: 'global systems written' }
  - { value: '9', label: 'menu and HUD scripts' }
  - { value: '3', label: 'ghost types' }
cover: ../../assets/shots/situs-tertinggal/cover.png
coverAlt: Title art of a kuntilanak, a long-haired ghost in white, against dark wood.
toy: diagonal-menu
links:
  - { label: Play on itch.io, href: 'https://plumz17.itch.io/situs-tertinggal' }
  - { label: Source on GitHub, href: 'https://github.com/Plumz17/CodelampProjectKelompok1' }
credits: Wave system and main loop by Hazard-Nico. Room interactions, enemy variants and end screens by Qin. Game design by Ahmad Mujahid and Zaki Delfino Gunawan. Art shared with Nathania Joscelind.
status: Playable prototype
---

## What it is

Paranormal investigators walk into an abandoned villa. You are the villa. Place a Pocong to knock them back, a Kuntilanak to stun a group with a scream, a Tuyul to strengthen the ghosts around it. Intruders do not die: drain their Fear bar and they run. Let ten reach the Purification Room and the house is cleansed.

## What I built

- **The shared foundation**: the first enemy and ghost base scenes, collision layers, and the path enemies follow.
- **Three global systems**: a game manager, an audio manager with separate music and effects buses, and a signal hub for the menus.
- **Menu UI**: animated title screen, settings with volume sliders, and level select.
- Animation setup for the Pocong and enemies, plus button, icon and level-layout assets.

## Engineering notes

### Agree on the contract first

Several people were about to build ghosts, enemies and rooms in parallel. Before that started I put in base scenes for both sides and fixed the collision layers they use to find each other. Cost, damage, attack rate and range are exported on the base, so a new ghost is mostly numbers plus one ability:

```gdscript
extends GhostBase
class_name Pocong

func _ready() -> void:
    ability_name = "Haunted Stomp"
    ability_cooldown = 90.0
    super._ready()
```

Pocong, Kuntilanak and Tuyul are each 35 to 50 lines because of it. Teammates then extended the base with upgrades, stuns and room buffs.

### Menus that do not know about each other

Title screen, settings and level select never hold references to one another. They emit and listen on one autoloaded signal hub, so a menu scene can be rearranged without breaking a connection made in someone else's branch. Sound goes through an audio manager that spawns a one-shot player on the effects bus and frees it when the clip ends, so overlapping clicks never cut each other off.

### A menu that is not a list

The title buttons fan out from the corner of the screen. Godot has no container for that, so I wrote one. Each child is placed from the bottom of the list upward, shifted, raised and rotated by an amount that grows with its position.

```gdscript
for i in count:
    var c = children[i] as Control
    var index: int = (count - 1) - i
    c.pivot_offset = Vector2(c.size.x, c.size.y)
    c.position = Vector2(-index * x_dev - c.size.x, -index * y_dev)
    c.rotation_degrees = index * rot_dev
```

Because it is a real `Container` marked `@tool`, it re-lays itself in the editor whenever a button is added, and the three numbers are adjusted from the inspector.

## Try it

The same layout rule, running on the game's own title buttons.
