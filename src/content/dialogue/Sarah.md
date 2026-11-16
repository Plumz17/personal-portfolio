---
date: 2026-11-16
repeatable: "true"
triggers:
  - talk-sarah
flags:
---

# Start

| Portrait               | Dialogue                                                                | Tags    |
| ---------------------- | ----------------------------------------------------------------------- | ------- |
| ![[sarah_happy.png]]   | Need a break? You look like you're on a tour.                           | #right  |
| ![[sarah_neutral.png]] | Sarah. I run the floor. If you only have five minutes, I'd read the big projects first. | #right  |
|                        | Show me the big projects. → #Go \|scroll=work\| <br>What's the biggest one? → #Biggest <br>Can I have a job? → #Job <br>I'm just walking around. → #Bye | #choice |

# Biggest

| Portrait               | Dialogue                                                                      | Tags   |
| ---------------------- | ----------------------------------------------------------------------------- | ------ |
| ![[sarah_neutral.png]] | The one we're standing in. Most of what you hear in this hall runs on his dialogue system. | #right |
|                        | Take me there. → #Go \|go=/work/truths-astray\| <br>Maybe later. → #Bye        | #choice |

# Go

| Portrait             | Dialogue          | Tags   |
| -------------------- | ----------------- | ------ |
| ![[sarah_happy.png]] | A job's a job. Go. | #right |

# Bye

| Portrait               | Dialogue                                 | Tags   |
| ---------------------- | ---------------------------------------- | ------ |
| ![[sarah_neutral.png]] | Don't worry about it so much. Look around. | #right |

# Job

| Portrait               | Dialogue                                                                               | Tags   |
| ---------------------- | -------------------------------------------------------------------------------------- | ------ |
| ![[sarah_happy.png]]   | Sure. Whenever you're ready for your training, just go to either the **Terminal** or the **Pinboard**. | #right |
| ![[sarah_confused.png]] | …Hang on. You don't work here.                                                        | #right |
| ![[sarah_neutral.png]] | Tell you what. Anders is the one looking for work. Read his stuff and hire *him*.      | #right |
|                        | Fair. Show me his work. → #Go \|scroll=work\| <br>I'll find the Terminal myself. → #Bye | #choice |
