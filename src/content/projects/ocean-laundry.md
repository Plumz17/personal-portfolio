---
title: Ocean Laundry
tagline: A laundry pickup and delivery platform for customers, couriers and outlet staff, built contract-first from one OpenAPI file. I owned the contract.
tier: project
order: 2
disciplines: [software]
year: '2026'
context: Platform-based Software Development course, UGM
role: Contract owner, auth, tests and deployment
team: Team of 4
stack: [TypeScript, Express, Vue, PostgreSQL, OpenAPI, Keycloak, Vitest, Docker, GitHub Actions, Vercel]
share: { mine: 72, total: 173, unit: commits, note: 'Not counting merges.' }
stats:
  - { value: '3', label: 'client roles, each with its own scopes' }
  - { value: '8', label: 'OAuth2 scopes in the contract' }
links:
  - { label: Live app, href: 'https://ocean-laundry-eosin.vercel.app/' }
  - { label: Source on GitHub, href: 'https://github.com/AjiPratama53/ocean-laundry' }
credits: Service deployment, configuration and migrations, most of the web client, and the mock server are teammates' work.
status: Deployed
---

## What it is

A customer orders a wash and pays; a courier picks the laundry up; staff weigh it, wash it and mark it ready; the courier delivers it. Each step is one operation in `openapi.yaml`, and the web app has one screen per step. The team split ownership by layer, and I was the contract owner: every change to the API went through me.

## What I built

- **Most of the OpenAPI contract**, 758 of its 852 lines: the order lifecycle, payment proceed and cancel, OAuth2 scopes on every operation, and distinct 401, 403 and 404 responses.
- **The authentication decision record**, which fixes the client types, flows and scope vocabulary, plus changes to the Keycloak realm's roles.
- **Contract tests** for orders, payments and packages, and the **negative authorization tests**.
- **Idempotent payments**: payments and orders carry an `Idempotency-Key`, stored with a hash of the request body, so a retry over a dropped connection returns the first response instead of charging twice.
- **Payment proceed and cancel** in the service and the web client, the payment receipt screen, and live polling on the order page.
- **Deployment**: the Dockerfile and a GitHub Actions workflow that builds and deploys the web client to Vercel.

### Three layers, three different answers

Access is checked in a fixed order. No valid token is a 401 before the database is touched. A token without the operation's scope is a 403, also before anything is loaded. A token with the right scope asking for someone else's order or payment gets a 404, identical to the one for an order that does not exist, so nobody can probe which ids are real.

The tests attack the third layer directly. One gives customer A a token with only `payments:write` and has them try to proceed and cancel customer B's payment; both must return 404. Leaving out `payments:read` on purpose catches a regression where the ownership check wrongly demanded it.

Tests never call Keycloak. The suite generates an RS256 key pair in memory and serves it from a small local JWKS endpoint, so CI runs offline and fast.

### Two people editing the same order

Every update sends `If-Match` with the order's ETag, and a stale one gets 412 Precondition Failed. Two bugs came out of this. ETags that came back with a weak `W/` prefix no longer matched, so I normalised the prefix in both the `If-None-Match` and `If-Match` checks. And staff saw a conflict error even when nothing important had changed, so on a 412 the client now refetches the order. If its status is the same, it retries once with the fresh ETag; if someone else has already moved it on, it shows the new state and says a colleague got there first.
