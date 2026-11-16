---
title: Cybersecurity knowledge graph
tagline: Extending an existing pipeline that reads security news and builds a queryable graph of threats, by adding two CVE feeds and a formal ontology.
tier: project
order: 4
disciplines: [software, ai]
year: '2026'
context: Software Engineering Methods course, UGM
role: Data sources, ontology, query fixes
team: Team of 4, extending an earlier group's system
stack: [Python, Gemini, RDF, OWL, SPARQL, Virtuoso, Redis, Docker]
share: { mine: 18, total: 54, unit: commits, note: The base pipeline was written by a previous group and its commits are included in the total. }
credits: Original pipeline by a previous class group. Dashboard and statistics by Azhar Maulana. SPARQL demo interface and graph dump by Evan Razzan Adytaputra. Project management by Dhimas Early Oceandy.
---

## What it is

The system polls security feeds every five minutes, asks a language model to extract entities and relationships from each article, and writes them into a graph database that can be queried with SPARQL. We inherited a working version and were asked to grow it.

## What I built

- **Two new sources**: the NVD CVE API and the CIRCL CVE feed, added to the scraper next to the four existing RSS feeds.
- **A formal OWL ontology** for the graph, 148 lines, combining STIX 2.1 terms with a project namespace.
- **CWE linking**, so a vulnerability points at its weakness class.
- Most of the **graph evaluation script**.
- **Fixes to the SPARQL use cases**, including one that returned nothing because relationships were written under a different namespace than the query read.

## What I took from it

Most of this work was reading someone else's code and changing it without breaking it, which is closer to day-to-day engineering than starting from an empty folder.
