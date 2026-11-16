---
title: Animal sound classification
tagline: Classifying animal calls from audio clips. I wrote the feature extraction stage that turns waveforms into numbers a model can use.
tier: project
order: 11
disciplines: [ai]
year: '2026'
context: Pattern Recognition course, UGM
role: Audio feature extraction
team: Team of 5
stack: [Python, librosa, NumPy, scikit-learn]
share: { mine: 5, total: 18, unit: commits }
links:
  - { label: Source on GitHub, href: 'https://github.com/Plumz17/PP_FinalProject' }
credits: Pre-processing, modelling and evaluation by teammates, as listed in the repository README.
---

## What I built

The feature extraction pipeline and the matching section of the paper. Clips arrive resampled, mono and trimmed of silence; my stage computes the descriptors the classifiers train on.

The models built on those features reach between 90% and 100% accuracy on a 400-clip test set, depending on the classifier.
