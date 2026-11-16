---
title: SolidCard
tagline: A flashcard app with no backend. Every deck lives in the user's own Solid Pod, and sharing means letting someone copy from yours.
tier: project
order: 3
disciplines: [software]
year: '2026'
context: Platform-based Software Development course, UGM
role: Front end, project setup and deployment
team: Team of 2
stack: [React, Vite, Solid Pods, RDF, GitHub Actions]
share: { mine: 13, total: 21, unit: commits }
links:
  - { label: Live app, href: 'https://plumz17.github.io/solid-cards/' }
  - { label: Source on GitHub, href: 'https://github.com/Plumz17/solid-cards' }
credits: Solid authentication, pod reads and writes, deck cloning and image upload by my teammate Early.
status: Deployed
---

## What it is

Solid is a web standard where your data sits in a personal store you control and apps ask permission to use it. SolidCard has no server and no database of its own: the browser talks straight to each user's pod.

A deck is a folder in the pod containing a Turtle file that uses schema.org terms. Anyone with a link can preview a public deck and clone it into their own pod, and the clone records where it came from. Nobody ever gets write access to someone else's deck.

## What I built

- **Project scaffolding** and a GitHub Actions workflow that builds and publishes to GitHub Pages on every push.
- **The React app shell**, base styles, and the deck list and deck editor screens.
- **Study mode options**: shuffled or in order, and re-sorting.
- **The mobile layout**.
- Error handling and a round of bug fixes across the app.
