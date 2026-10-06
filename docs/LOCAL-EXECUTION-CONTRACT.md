# Local Execution Contract

## Purpose

Define the boundary between the canonical GitHub repository and any local machine used to produce video artifacts.

## Authority

```text
GitHub repository
= canonical production intent + implementation + gate ledger

Local machine
= execution environment
```

The repository owns:
- brief;
- script;
- storyboard;
- asset plan;
- timeline/spec;
- workflows;
- reusable registry;
- implementation source;
- dependency/config definitions;
- QA rules;
- `GATES.json`.

Local owns only machine-specific execution concerns such as installed runtime, FFmpeg availability, cache and generated render output.

## Required local flow

```text
git pull
  ↓
install dependencies
  ↓
validate gate manifest
  ↓
check
  ↓
preview
  ↓
report G5 evidence
  ↓
render
  ↓
technical QA / probe
  ↓
report G6 evidence
  ↓
human final review
```

## Local may

- install dependencies;
- run preview/render/check commands;
- create local caches;
- create generated MP4/screenshots;
- run FFprobe/technical validators;
- report runtime/render errors;
- report evidence for G5/G6;
- propose fixes.

## Local must not silently

- rewrite script;
- change storyboard intent;
- change claims/facts;
- change reusable block behavior;
- change timing only to hide an implementation bug;
- introduce machine-only source that cannot be reproduced from the repo;
- mark `G7_HUMAN_FINAL` as passed.

## Evidence returned from local

Useful local evidence includes:
- command + result;
- preview screenshot/reference;
- observed overflow/clipping;
- render path;
- FFprobe metadata;
- duration delta;
- missing asset error;
- QA observation.

Do not use “ran successfully” as a substitute for the actual check result when a measurable output exists.

## Generated artifacts

Rendered MP4 files normally remain outside Git history.

Commit a render/screenshot only when deliberately used as:
- a visual regression fixture;
- a review reference;
- a documented release artifact.

Otherwise reference it as local evidence.

## Reproducibility rule

A fresh machine with the documented runtime and dependencies must be able to reproduce the intended video from the repository without hidden chat context or legacy local folders.
