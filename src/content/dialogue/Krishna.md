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
|                            | Show me the image detector. → #Go \|go=/work/ai-image-detector\| <br>Show me all the AI work. → #AI \|filter=ai\| <br>Inspect me. → #Inspect <br>I'll pass. → #Bye | #choice |

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

# Inspect

| Portrait                  | Dialogue                                                                                     | Tags            |
| ------------------------- | -------------------------------------------------------------------------------------------- | --------------- |
| ![[krishna_confused.png]] | Hold still.                                                                                  | #right          |
| ![[krishna_neutral.png]]  | Hands, clean. Shoes, questionable. You pass. Barely. <br>You've been scrollin' a while. Drink some water. That's an order. <br>No violations. Rare. Don't let it go to your head. <br>Hmm. Ninety-six percent sure you're real. Fifty if you've been saved as a JPEG. | #right #random |
