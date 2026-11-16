---
date: 2026-11-16
repeatable: "true"
triggers:
  - talk-wei
flags:
---

# Start

| Portrait                                   | Dialogue                                                                 | Tags    |
| ------------------------------------------ | ------------------------------------------------------------------------ | ------- |
| ![[wei_happy.png\|Detective Wei]]          | GOOD MORNING, VISITOR!                                                   | #right  |
| ![[wei_happy.png\|Detective Wei]]          | I AM DETECTIVE WEI QING-TIAN FROM THE NAVAPORT POLICE DEPARTMENT!        | #right  |
| ![[wei_neutral.png\|Detective Wei]]        | A GOOD DETECTIVE SEARCHES EVERYTHING! PRESS **/** AND YOU CAN TOO!       | #right  |
|                                            | Open the search. → #Go \|terminal\| <br>What can I search for? → #How <br>Am I a suspect? → #Suspect {wei-suspect} <br>Carry on, detective. → #Bye | #choice |

# How

| Portrait                            | Dialogue                                                                     | Tags   |
| ----------------------------------- | ---------------------------------------------------------------------------- | ------ |
| ![[wei_confused.png\|Detective Wei]] | A NAME! A LANGUAGE! A TOOL! TYPE **help** AND IT WILL CONFESS ITS COMMANDS! | #right |
|                                     | Open the search. → #Go \|terminal\| <br>Thanks. → #Bye                       | #choice |

# Go

| Portrait                         | Dialogue                   | Tags   |
| -------------------------------- | -------------------------- | ------ |
| ![[wei_happy.png\|Detective Wei]] | THE INVESTIGATION BEGINS! | #right |

# Bye

| Portrait                         | Dialogue                                    | Tags   |
| -------------------------------- | ------------------------------------------- | ------ |
| ![[wei_happy.png\|Detective Wei]] | WE MUST NOT LET EVIL GO UNPUNISHED. GOODBYE! | #right |

# Suspect

| Portrait                             | Dialogue                                                                  | Tags    |
| ------------------------------------ | ------------------------------------------------------------------------- | ------- |
| ![[wei_confused.png\|Detective Wei]] | …                                                                        | #right  |
| ![[wei_happy.png\|Detective Wei]]    | EVERYONE IS A SUSPECT!                                                    | #right  |
| ![[wei_neutral.png\|Detective Wei]]  | YOU HAVE BEEN READING SOMEONE'S PROJECTS FOR QUITE SOME TIME. VERY SUSPICIOUS! | #right  |
|                                      | I'm innocent! → #Innocent <br>I'm a recruiter. → #Recruiter <br>You got me. → #Confess | #choice |

# Innocent

| Portrait                             | Dialogue                                                         | Tags   |
| ------------------------------------ | ---------------------------------------------------------------- | ------ |
| ![[wei_confused.png\|Detective Wei]] | THAT IS EXACTLY WHAT A GUILTY PERSON WOULD SAY!                  | #right |
| ![[wei_happy.png\|Detective Wei]]    | …BUT ALSO AN INNOCENT ONE. YOU MAY GO. FOR NOW!                  | #right |

# Recruiter

| Portrait                             | Dialogue                                                              | Tags   |
| ------------------------------------ | --------------------------------------------------------------------- | ------ |
| ![[wei_happy.png\|Detective Wei]]    | A RECRUITER! THE MOST DANGEROUS KIND OF VISITOR!                       | #right |
| ![[wei_neutral.png\|Detective Wei]]  | THE CONTACT DETAILS ARE AT THE END OF THE HALL. I DID NOT TELL YOU THAT. | #right |
|                                      | Take me there. → #Go \|scroll=contact\| <br>Thanks, detective. → #Bye | #choice |

# Confess

| Portrait                             | Dialogue                                                     | Tags   |
| ------------------------------------ | ------------------------------------------------------------ | ------ |
| ![[wei_happy.png\|Detective Wei]]    | A CONFESSION! CASE CLOSED!                                   | #right |
| ![[wei_confused.png\|Detective Wei]] | …WHAT WAS THE CRIME AGAIN?                                   | #right |
