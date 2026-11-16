---
title: Scalable poetry platform
tagline: A poetry publishing site split into seven services behind one gateway. I owned the gateway, the search service and the monitoring.
tier: project
order: 1
disciplines: [software]
year: '2026'
context: Scalable Software Development course, UGM. Final project, rebuilt from a stateful monolith.
role: Gateway, search service and observability
team: Team of 5
stack: [Python, FastAPI, Nginx, RabbitMQ, MySQL, Redis, Prometheus, Grafana, k6, Docker Compose]
share: { mine: 8, total: 17, unit: commits, note: 'Not counting merges. Most on the team.' }
stats:
  - { value: '7', label: 'services behind one Nginx gateway' }
  - { value: '~200 req/s', label: 'per search replica before the CPU saturates, measured locally' }
links:
  - { label: Source on GitHub, href: 'https://github.com/satyawirapramudita/Final_Project_Scalable' }
credits: The auth, poem, NLP worker, word cloud and KBBI dictionary services, and the event contract, are teammates' work.
status: Runs end to end with Docker Compose
---

## What it is

Writers publish poems; the site analyses each one, draws a word cloud of its dominant terms and links poetic words to their standard dictionary (KBBI) entries. It started as a single stateful app earlier in the course and was rebuilt as stateless services: HTTP for login, reading and search, and RabbitMQ events for the slower analysis work.

## What I built

- **The gateway.** Nginx is the only way in. It rate-limits every API route (429 with a JSON body), stamps each request with an `X-Request-ID`, and turns 502, 503 and 504 into JSON errors the front end can show. Upstreams are resolved at request time through Docker's DNS, so a service can be scaled to three replicas and the gateway spreads load across them without a config change.
- **The search service.** Its index is built from events rather than by reading the poem database: `poem.created` and `poem.updated` fill in the text, `poem.analyzed` adds tags, and `poem.deleted` leaves a tombstone.
- **Monitoring.** Prometheus scrapes every service every five seconds, and a Grafana dashboard that loads with no clicking shows each SLO with a red line at its limit: p95 under 300 ms for reading and searching, under 500 ms for publishing, and under 1% server errors. It also shows RabbitMQ queue depth and dead letters per queue.
- **A k6 load test** for search with the same thresholds, plus scripts to seed a thousand fake poems and rebuild the index.

### Events arrive out of order, and twice

Each group of fields in the index carries the timestamp of the event that wrote it, so an older event can never overwrite a newer one, and a poem that has been deleted is not brought back by a late update. Delivering the same event twice changes nothing. When MySQL goes down, the consumer holds events for about 45 seconds waiting for it to return instead of dumping them into the dead-letter queue.

### Cache invalidation without a stampede

Search results are cached in Redis under one global version number, and any change to the index bumps it. Bumps are coalesced into one every two seconds, so a burst of new poems clears the cache once instead of once per poem, and a new poem still shows up in search within about two seconds.

### When Redis dies, requests should not wait for it

With the Redis container down, every cache call sat waiting on a failing DNS lookup for several seconds, which the socket timeout does not cover. I wrote a small circuit breaker, now shared by the poem, word cloud and dictionary services: the first failure opens it, every cache call then returns immediately and the request is served from MySQL, and a background thread pings Redis every five seconds and closes the breaker when it is back. No visitor's request is ever used as the test.

Database connections are pooled and capped, so a request that cannot get one fails fast with a 503 instead of queueing.
