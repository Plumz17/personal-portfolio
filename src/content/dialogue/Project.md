---
date: 2026-11-16
repeatable: "true"
triggers:
  - at-project
flags:
---

# Start

| Portrait                 | Dialogue                                                                                    | Tags    |
| ------------------------ | ------------------------------------------------------------------------------------------- | ------- |
| ![[dorothy_neutral.png]] | In a hurry? The panel beside the text has the role, the team size and the share of commits. | #left   |
|                          | Take me to the interactive part. → #Scrolled [has-toy] \|scroll=try\| <br>Who else worked on this? → #Scrolled [has-credits] \|scroll=credits\| <br>Next project. → #Go \|next\| <br>Back to the list. → #Go \|go=/#work\| <br>I'll keep reading. → #Bye | #choice |

# Scrolled

| Portrait               | Dialogue     | Tags  |
| ---------------------- | ------------ | ----- |
| ![[dorothy_happy.png]] | There ya go! | #left |

# Go

| Portrait               | Dialogue  | Tags  |
| ---------------------- | --------- | ----- |
| ![[dorothy_happy.png]] | This way~ | #left |

# Bye

| Portrait               | Dialogue        | Tags  |
| ---------------------- | --------------- | ----- |
| ![[dorothy_happy.png]] | Take your time~ | #left |
