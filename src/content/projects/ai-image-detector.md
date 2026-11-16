---
title: AI Image Detector
tagline: A web and mobile app that says whether a picture is a photo or AI-generated, with a test suite that shows exactly where the model stops working.
tier: flagship
order: 3
disciplines: [software, ai]
year: '2026'
context: Capstone project, Universitas Gadjah Mada
role: Team lead, backend and evaluation
team: Team of 6
stack: [Python, FastAPI, PyTorch, scikit-learn, React, Vite, Docker]
share:
  mine: 28
  total: 47
  unit: commits
  note: Reference backend, API contract, web app skeleton and all evaluation are mine. The slim server and mobile app are a teammate's; the model comes from a thesis.
stats:
  - { value: '96%', label: 'accuracy on the clean baseline' }
  - { value: '50%', label: 'after JPEG quality 50' }
  - { value: '17', label: 'test conditions run' }
links:
  - { label: Live web app, href: 'https://ai-image-detector-web-seven.vercel.app' }
  - { label: Source on GitHub, href: 'https://github.com/Plumz17/ai-image-detector' }
credits: The PatchCraft model and weights come from a thesis author and are used unmodified. The slim server (LiteRT and NumPy), model conversion, mobile app, about page and UI design are teammates' work.
status: Deployed
hook: Measure where it breaks
feature: band
---

## What it is

Upload a JPG or PNG and the service answers `real` or `fake`, how many crops of the image it examined, and what share of them looked generated. Detection uses PatchCraft, a method that ignores what a picture shows and looks only at fine pixel texture.

We were handed a trained research model in a notebook. The project was turning that into something other people could call, and then finding out how far to trust it.

## What I built

- **The reference backend**: a FastAPI service with `/health` and `/predict`, upload validation, rate limiting, CORS, structured errors and a Docker image.
- **The API contract** the web and mobile teams built against.
- **The web app skeleton** in React, and later its paste support and plain-language results.
- **The evaluation harness**: scripts that generate degraded copies of a test set, run every image five times and summarise the confusion matrix.

## Engineering notes

### Wrap the research code, do not edit it

The thesis author's file stays byte-for-byte unchanged. Everything we needed lives in a subclass, so any difference in behaviour is ours and is easy to find.

```python
class Detector(ModelInference):
    def __init__(self, feature_extractor_path, svm_path):
        super().__init__(feature_extractor_path, svm_path)
        self.feature_extractor.eval()
```

That one `eval()` call mattered. The network has batch-normalisation layers; fed one image at a time without it, almost everything came out as fake.

### A voting bug in the original

An image is cut into square crops and each crop votes. The original script truncated the average, so two fake crops out of three (0.67) became 0 and the image was called real. The subclass uses a strict majority and breaks an exact tie with the mean SVM probability.

### Reject bad input before it costs anything

The model uses every CPU core, so only one prediction runs at a time behind a lock. Validation happens before the lock is taken: a corrupt or oversized upload fails immediately and never waits in the queue. A request that waits more than 30 seconds gets a 503.

```python
_validate_image(image_bytes)          # outside the lock
if not _lock.acquire(timeout=config.REQUEST_TIMEOUT_SECONDS):
    raise ServerBusy("Server busy, try again later")
```

### Measure where it breaks

On 200 clean test images the model is right 96% of the time. I then re-ran the same images compressed, resized and cropped, plus images from four other generators.

- JPEG at quality 95 drops accuracy to 78%. At quality 50 it is 50%, no better than a coin.
- Shrinking to a quarter size gives 54%.
- On 20 real photos passed through an AI enhancer, 13 were called fake.

So the app says so. The result is worded as an estimate, JPEG uploads get a warning, and the README documents every limitation.
