---
date: 2026-11-16
repeatable: "true"
triggers:
  - met-dorothy
  - at-home
flags:
---

# Start

| Portrait                 | Dialogue             | Tags    |
| ------------------------ | -------------------- | ------- |
| ![[dorothy_neutral.png]] | What's up? Where to? | #left   |
|                          | The game you're from. → #Go \|go=/work/truths-astray\| <br>Everything Anders has made. → #Go \|go=/archive\| <br>How do I search? → #Search <br>Show all three disciplines. → #Reset \|filter=all\| <br>Stop popping up. → #Mute {guide-muted} <br>Nothing much. → #Bye | #choice |

# Go

| Portrait               | Dialogue  | Tags  |
| ---------------------- | --------- | ----- |
| ![[dorothy_happy.png]] | This way~ | #left |

# Search

| Portrait                 | Dialogue                                                                        | Tags  |
| ------------------------ | ------------------------------------------------------------------------------- | ----- |
| ![[dorothy_neutral.png]] | Press **/** or hit the search button up top. Type a name, a language or a tool. | #left |
| ![[dorothy_happy.png]]   | It knows a few commands too. Try typing **help**.                               | #left |

# Reset

| Portrait                 | Dialogue                     | Tags  |
| ------------------------ | ---------------------------- | ----- |
| ![[dorothy_neutral.png]] | All three masks are back on! | #left |

# Mute

| Portrait                 | Dialogue                                          | Tags  |
| ------------------------ | ------------------------------------------------- | ----- |
| ![[dorothy_unhappy.png]] | Hmm… Okay. I'll stay out of the way.              | #left |
| ![[dorothy_happy.png]]   | Type **guide** in search if you change your mind~ | #left |

# Bye

| Portrait               | Dialogue        | Tags  |
| ---------------------- | --------------- | ----- |
| ![[dorothy_happy.png]] | I'll be around~ | #left |
