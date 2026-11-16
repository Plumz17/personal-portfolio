---
title: Banana variety and ripeness
tagline: Two classifiers from one pipeline, telling five banana varieties and four ripeness stages apart with hand-built features and an SVM.
tier: project
order: 6
disciplines: [ai]
year: '2026'
context: Pattern Recognition course, UGM
role: Sole developer
team: Solo
stack: [Python, OpenCV, scikit-image, mahotas, scikit-learn]
stats:
  - { value: '81.6%', label: 'variety accuracy, 5 classes' }
  - { value: '81.0%', label: 'ripeness accuracy, 4 classes' }
  - { value: '1,634 → 263', label: 'feature dimensions after PCA' }
links:
  - { label: Source on GitHub, href: 'https://github.com/Plumz17/PP_FinalProject2' }
---

## What I built

The full pipeline: loading and augmenting 1,960 images per task, enhancement, segmentation, feature extraction, scaling, PCA and a grid-searched SVM.

Variety and ripeness need different evidence. Variety depends on shape and surface texture, so it uses LBP, GLCM, HOG and Zernike moments: 1,634 numbers per image, cut to 263 by PCA. Ripeness needs far fewer: 115 features, cut to 37.

## Results

| Task | SVM | Random forest |
|---|---|---|
| Variety (Ambon, Cavendish, Mas, Raja, Saba) | 81.6% | 72.8% |
| Ripeness (unripe to overripe) | 81.0% | 74.5% |

Both numbers are on a held-out test set of 294 images.
