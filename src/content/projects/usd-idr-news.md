---
title: Does the news move the rupiah?
tagline: An NLP study testing whether geopolitical headlines can predict next-day USD/IDR direction. So far, they can't.
tier: project
order: 3
disciplines: [ai]
year: '2026'
context: Natural Language Processing course, UGM. In progress, stage 3 of 4.
role: Data collection and modelling experiments
team: Team of 4
stack: [Python, FinBERT, IndoBERT, RoBERTa, FastText, Qwen2.5, scikit-learn]
share: { mine: 35, total: 54, unit: commits }
stats:
  - { value: '14k', label: 'articles scraped' }
  - { value: '5', label: 'text representations compared' }
  - { value: '~50%', label: 'validation directional accuracy' }
links:
  - { label: Source on GitHub, href: 'https://github.com/Plumz17/nlp-geopolitics-usa' }
credits: Exchange-rate series, temporal alignment, lexicon features and the baseline models were built by teammates.
status: In progress
---

## The question

Bank Indonesia publishes a reference USD/IDR rate (JISDOR) every trading day. The hypothesis: global geopolitical news carries enough signal to predict whether the rate goes up or down the next day.

## What I built

- **The scraper**: about 14,000 English articles from Google News RSS, collected week by week with checkpoints so a failed run resumes.
- **A second, Indonesian source** scraped from CNBC Indonesia, aligned to the same trading days.
- **A relevance filter** on headline and lead paragraph, with its rules frozen before any model saw the data.
- **Five representation experiments**, each feeding the same two classifiers.

| Run | Text representation |
|---|---|
| C1 | FastText vectors, reduced with PCA |
| C2 | FinBERT embeddings, CLS and mean pooling |
| C3 | IndoBERT on the Indonesian corpus |
| C4 | RoBERTa embeddings |
| C5 | Per-article event, region and dollar-impact labels from Qwen2.5-3B, zero-shot |

## What the numbers say

In the validation results recorded so far, directional accuracy sits at or just below 50% and Matthews correlation is within 0.05 of zero. Bigger language models did not help.

That is a result. The split is by time, the filter was fixed in advance and the same split is used for every run, so the pipeline cannot flatter itself. The final stage is hypothesis testing and error analysis on the held-out test set.
