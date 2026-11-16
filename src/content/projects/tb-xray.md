---
title: Tuberculosis detection from chest X-rays
tagline: A classical image-processing pipeline, no deep learning, that reaches 96.9% accuracy and shows which texture features actually find the disease.
tier: project
order: 2
disciplines: [ai]
year: '2025'
context: Digital Image Processing course, UGM
role: Image-processing pipeline and report
team: Team of 4
stack: [Python, OpenCV, NumPy, scikit-learn, Flask]
share: { mine: 48, total: 107, unit: commits }
stats:
  - { value: '96.9%', label: 'accuracy, GLCM + HOG + LBP' }
  - { value: '16', label: 'missed TB cases, fewest of any combination' }
  - { value: '7', label: 'feature combinations compared' }
links:
  - { label: Source on GitHub, href: 'https://github.com/Plumz17/PCD_FinalProject' }
credits: Classifier training and evaluation, and the Flask front end, by teammates. Documentation was written together.
---

## The constraint

Clinics that most need TB screening often have no GPU and no radiologist. We limited ourselves to operations that run on any laptop and can be explained step by step.

## What I built

The image pipeline, from raw X-ray to feature vector: contrast enhancement, lung segmentation with thresholding and morphology, then three hand-crafted feature families.

- **GLCM** for texture statistics.
- **HOG** for edges and shape.
- **LBP** for local texture patterns.

## Results

| Features | Accuracy | Missed TB cases |
|---|---|---|
| GLCM + HOG + LBP | 96.90% | 16 |
| GLCM + LBP | 95.59% | 23 |
| GLCM + HOG | 95.23% | 24 |
| GLCM | 95.23% | 24 |
| HOG | 93.33% | 34 |
| LBP | 83.69% | 137 |

LBP alone scores 83.7% while detecting **no TB cases at all**: on an imbalanced set it predicts "normal" for everything. Accuracy hid a useless model, which is why the table reports missed cases next to it.
