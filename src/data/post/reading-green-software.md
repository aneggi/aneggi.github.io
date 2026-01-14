---
publishDate: 2025-01-05T08:30:00Z
title: 'Reading list: greener software engineering'
excerpt: A rolling set of takeaways from papers and blog posts about sustainable software.
category: green-software
tags:
  - sustainability
  - research-notes
  - green
author: Alessandro Aneggi
metadata:
  canonical: https://aneggi.github.io/blog/reading-green-software
---

Recent highlights from my reading queue:

1) **Green Software Handbook** — clear framing of energy, carbon, and hardware efficiency levers. Great reminder to log
   both compute and data movement costs.

2) **Power profiling in CI pipelines** — several teams now ship optional runners with power sensors. The best results
   come when the profiling step is opt-out and runs on the same workloads as the regular suite.

3) **Edge vs. cloud trade-offs** — migrating work to the edge can cut latency *and* power if workloads are bursty, but
   only when idle scaling is aggressive and observability remains centralized.

4) **Developer UX matters** — green advice that is buried in reports gets ignored. Inline hints in the IDE and chat
   reminders tied to pull requests have better adoption.

I keep refining these notes as I learn; expect this post to evolve alongside the experiments I run with teams.
