---
title: Face emotion classification
tagline: Four CNN variants trained on 25,000 AffectNet faces, lifting test accuracy from a 55% baseline to 64%.
tier: project
order: 7
disciplines: [ai]
year: '2026'
context: Deep Learning course mini project, UGM
role: Team member
team: Team project
stack: [Python, TensorFlow, Keras]
stats:
  - { value: '63.8%', label: 'best test accuracy' }
  - { value: '55.3%', label: 'baseline' }
  - { value: '432', label: 'duplicate images removed by hash' }
links:
  - { label: Notebook on Colab, href: 'https://colab.research.google.com/drive/19c2pHCuZSRBf6Fw5kFvMTajJVrV9nVBA' }
---

## What it is

A comparison of convolutional networks for recognising emotion in face photos. The data is the AffectNet set in YOLO format: 25,262 images, de-duplicated by file hash before splitting, with class weights to offset imbalance.

| Model | Test accuracy |
|---|---|
| Baseline CNN | 55.3% |
| Proposed CNN | 63.8% |
| Proposed + L2 regularisation | 62.2% |
| Proposed + Leaky ReLU | 63.8% |

Regularisation cost a point and a half; the activation change made no measurable difference. The work lives in a shared notebook, so individual contributions are not recorded in version control.
