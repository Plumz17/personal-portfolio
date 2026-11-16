---
date: 2026-11-16
repeatable: "true"
triggers:
  - talk-jenny
flags:
---

# Start

| Portrait                    | Dialogue                                                                  | Tags    |
| --------------------------- | ------------------------------------------------------------------------- | ------- |
| ![[jenny_neutral.png\|???]] | …                                                                         | #right  |
| ![[jenny_neutral.png]]      | Name's Jenny. Jenny Huang.                                                | #right  |
| ![[jenny_confused.png]]     | Wei said some interesting things about you… You're digging into Anders, huh? | #right  |
| ![[jenny_happy.png]]        | Hehe. If you want the full file, it's all at the end of the hall.         | #right  |
|                             | Who is he, then? → #Go \|scroll=about\| <br>How do I reach him? → #Go \|scroll=contact\| <br>Show me everything he's made. → #Go \|go=/archive\| <br>What did Wei say? → #Wei <br>No more! Go! → #Bye | #choice |

# Go

| Portrait               | Dialogue                  | Tags   |
| ---------------------- | ------------------------- | ------ |
| ![[jenny_happy.png]]   | Questioned him thoroughly. I like that. | #right |

# Bye

| Portrait                 | Dialogue   | Tags   |
| ------------------------ | ---------- | ------ |
| ![[jenny_neutral.png]]   | Anyway…    | #right |

# Wei

| Portrait                | Dialogue                                                                        | Tags                          |
| ----------------------- | ------------------------------------------------------------------------------- | ----------------------------- |
| ![[jenny_happy.png]]    | That you walked up and asked if you were a suspect. Who *does* that?            | #right #requires/wei-suspect  |
| ![[jenny_neutral.png]]  | That you're a suspect. Don't take it personally. He says it to everyone.        | #right #requires/not-wei-suspect |
| ![[jenny_confused.png]] | He said it to the coffee machine yesterday.                                     | #right                        |
