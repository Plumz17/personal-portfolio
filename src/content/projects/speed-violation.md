---
title: Speed violations from CCTV
tagline: Detecting vehicles that break the speed limit in footage from a Yogyakarta junction, using YOLO11n, ByteTrack and a bird's-eye-view transform.
tier: project
order: 5
disciplines: [ai]
year: '2026'
context: Computer Vision and Image Analysis course, UGM
role: Dataset pipeline and documentation
team: Team of 5
stack: [Python, YOLO11n, ByteTrack, OpenCV, Roboflow]
share: { mine: 9, total: 29, unit: commits }
links:
  - { label: Source on GitHub, href: 'https://github.com/Plumz17/CVL_FinalProject' }
credits: Detection training, tracking and the speed estimation script were led by teammates.
---

## What it is

Six hours of traffic camera footage from the Adisucipto airport junction, recorded by the Yogyakarta transport agency. The system detects motorcycles, cars, buses and trucks, tracks each one across frames, maps the road onto a flat top-down plane with a homography, and estimates speed from distance travelled. A vehicle over the limit is flagged and a snapshot is saved as evidence.

## What I built

- **Frame extraction** from the raw videos into a dataset ready for annotation.
- **Dataset import** from Roboflow in YOLO format.
- Repository structure, the README and the presentation material.
