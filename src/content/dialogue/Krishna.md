---
date: 2026-11-16
repeatable: "true"
triggers:
  - talk-krishna
flags:
---

# Start

| Portrait                   | Dialogue                                                                  | Tags    |
| -------------------------- | ------------------------------------------------------------------------- | ------- |
| ![[krishna_neutral.png]]   | Name's Krishna, Health Inspector.                                         | #right  |
| ![[krishna_confused.png]]  | You're checkin' if this guy's work is the real deal, huh? Smart.          | #right  |
| ![[krishna_happy.png]]     | He built a thing that checks if a picture's real. Inspector to inspector, I respect that. | #right  |
|                            | Show me the image detector. → #Go \|go=/work/ai-image-detector\| <br>Show me all the AI work. → #AI \|filter=ai\| <br>I'll pass. → #Bye | #choice |

# AI

| Portrait                 | Dialogue                                                 | Tags   |
| ------------------------ | -------------------------------------------------------- | ------ |
| ![[krishna_neutral.png]] | Done. Only the AI stuff's showin' now. **3** undoes it.  | #right |

# Go

| Portrait               | Dialogue                     | Tags   |
| ---------------------- | ---------------------------- | ------ |
| ![[krishna_happy.png]] | Keep fighting the good fight. | #right |

# Bye

| Portrait                  | Dialogue                | Tags   |
| ------------------------- | ----------------------- | ------ |
| ![[krishna_confused.png]] | Suit yourself.          | #right |
