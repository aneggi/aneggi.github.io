---
publishDate: 2025-01-10T09:00:00Z
updateDate: 2025-01-12T15:00:00Z
title: 'Tracking energy feedback for developers'
excerpt: Notes on building feedback loops that expose power consumption while teams ship features.
category: green-software
tags:
  - energy
  - devops
  - telemetry
author: Alessandro Aneggi
metadata:
  canonical: https://aneggi.github.io/blog/tracking-energy-feedback
---

I have been reading about how to surface power consumption to developers without slowing delivery. A few themes stand
out:

- **Real-time, low-noise signals.** Aggregate readings at the CI and deployment edges, but stream concise deltas back to
  the IDE or chat so engineers know when an experiment is trending in the wrong direction.
- **Compare against budgets, not vague goals.** Budgets per service, environment, and team help avoid generic
  “consume less” advice. Pair them with guardrails to catch regressions before a big merge.
- **Automate the boring parts.** Instrument pipelines to collect data from energy-aware runners or proxies; wire alerts
  into incident playbooks instead of relying on dashboards that nobody has time to check.
- **Keep the loop short.** When a change spikes energy use, notify the author within minutes. Long delays turn feedback
  into blame instead of learning.

I am prototyping a lightweight pipeline hook that records power deltas per build and posts them back to teams alongside
performance and quality metrics.
