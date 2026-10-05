# SEO vs Paid Ads — Canonical Build Plan

## Goal

Build `seo-vs-paid-ads` from the repository as the canonical production source.

There is no requirement to migrate or preserve the old local implementation. Any previous local render is reference material only.

## Core rule

**Spec first → local execution second.**

The repository defines what the video is. Local defines how that checked-out version is executed on a machine.

## Phase 1 — Canonical production spec

Define in-repo:

- brief;
- script;
- storyboard;
- timing/timeline where useful;
- brand/frame rules if applicable;
- reusable block references;
- media requirements;
- acceptance criteria.

No hidden local context should be required to understand or recreate the intended video.

## Phase 2 — Minimal implementation

Create only the code/assets/config required to produce the locked storyboard.

Preferred order:

```text
brief
  ↓
script
  ↓
storyboard
  ↓
registry lookup
  ↓
composition implementation
  ↓
local preview/render
```

Do not extract a generic engine abstraction until the real implementation shows repeated pain or reuse.

## Phase 3 — Local execution

The local environment:

1. clones or pulls the repository;
2. installs documented dependencies;
3. runs the repository-defined preview/render command;
4. outputs preview/MP4 artifacts;
5. reports errors, screenshots or QA findings.

Generated renders normally remain local and are not committed unless they serve a specific review/test purpose.

## Phase 4 — QA and reusable extraction

After the first successful render:

- review timing/layout/readability/audio;
- fix only evidenced issues;
- identify genuinely reusable scenes/blocks;
- promote reusable primitives into the registry only when justified by another real use case or repeated use;
- keep renderer-specific implementation behind the renderer boundary.

## Renderer policy

V0.2 does not require HyperFrames or Remotion.

The first implementation should choose the simplest renderer that can reliably produce the video. Future renderer adapters must consume the same production intent rather than forcing the brief/storyboard to match renderer-specific APIs.

## Current checkpoint

The project is no longer a migration task. It is the first canonical build used to validate the V0.2 production architecture.

Next action: lock script + storyboard in this repository.
