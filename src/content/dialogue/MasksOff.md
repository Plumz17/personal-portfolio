---
date: 2026-11-16
repeatable: "true"
triggers:
  - masks-off
  - visitor
  - not-guide-muted
flags:
---

# Start

| Portrait                 | Dialogue                                                      | Tags    |
| ------------------------ | ------------------------------------------------------------- | ------- |
| ![[dorothy_unhappy.png]] | Hmm… You turned every mask off. There's nothing left to file. | #left   |
| ![[dorothy_neutral.png]] | The monkey from *Phase Reveal* would be proud. Also stuck.    | #left   |
|                          | Bring everything back. → #Reset \|filter=all\| <br>I like the quiet. → #Bye | #choice |

# Reset

| Portrait               | Dialogue                  | Tags  |
| ---------------------- | ------------------------- | ----- |
| ![[dorothy_happy.png]] | And there was work again~ | #left |

# Bye

| Portrait                 | Dialogue                                                      | Tags  |
| ------------------------ | ------------------------------------------------------------- | ----- |
| ![[dorothy_unhappy.png]] | Suit yourself. Keys **1**, **2** and **3** when you're ready. | #left |
