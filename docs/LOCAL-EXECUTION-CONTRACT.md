# Local Execution Contract

## Purpose

Define the boundary between the canonical GitHub repository and any local machine used to produce video artifacts.

## Authority

```text
GitHub repository
= canonical production intent and implementation source

Local machine
= execution environment
```

The repository owns:

- brief;
- script;
- storyboard;
- timeline/spec;
- workflows;
- reusable registry;
- implementation source;
- dependency/config definitions;
- QA rules.

Local owns only machine-specific execution concerns such as installed runtime, FFmpeg availability, cache and generated render output.

## Required local flow

```text
git pull
  ↓
install dependencies
  ↓
validate/check
  ↓
preview
  ↓
render
  ↓
QA observations
  ↓
commit deliberate fixes back to repo if needed
```

## Local may

- install dependencies;
- run preview/render/check commands;
- create local caches;
- create generated MP4/screenshots;
- report runtime/render errors;
- propose fixes.

## Local must not silently

- rewrite script;
- change storyboard intent;
- change claims/facts;
- change reusable block behavior;
- change timing only to hide an implementation bug;
- introduce machine-only source that cannot be reproduced from the repo.

## Generated artifacts

Rendered MP4 files should normally remain outside Git history.

Commit a render/screenshot only when it is deliberately used as:

- a visual regression fixture;
- a review reference;
- a documented release artifact.

## Reproducibility rule

A fresh machine with the documented runtime and dependencies should be able to reproduce the intended video from the repository without hidden chat context or legacy local folders.
