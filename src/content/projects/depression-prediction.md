---
title: Student depression prediction
tagline: A tabular ML pipeline on a public student survey, ending in a small text tool that returns a prediction and its confidence.
tier: project
order: 8
disciplines: [ai]
year: '2026'
context: Machine Learning course, UGM
role: Sole developer
team: Solo
stack: [Python, scikit-learn, pandas]
stats:
  - { value: '84.4%', label: 'test accuracy' }
  - { value: '0.869', label: 'F1 score' }
  - { value: '4,186', label: 'test records' }
links:
  - { label: Source on GitHub, href: 'https://github.com/Plumz17/FinalProjectML' }
---

## What I built

Data preparation, cross-validation across candidate models, hyperparameter tuning of the best one, and evaluation on a held-out test set of 4,186 students. Inputs cover demographics, academic performance, lifestyle and mental-health history.

The last section turns the model into something usable: you answer the survey questions as text prompts and it returns a prediction with a confidence score.
