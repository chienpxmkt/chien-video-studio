# SEO vs Paid Ads — Project State

## Status

`STORYBOARD_LOCKED / READY_FOR_IMPLEMENTATION`

## Workflow

`faceless-explainer`

## Canonical authority

This repository is the canonical production source for this video.

Local environments are execution targets only. They may install dependencies, preview, render and report results, but they do not define the canonical script, storyboard, timeline, registry or production rules unless those changes are committed back through the repository workflow.

## Technical target

- Video ID: `seo-vs-paid-ads`
- Working template direction: `explainer-clean`
- Orientation: vertical
- Aspect ratio: `9:16`
- Resolution: `1080 × 1920`
- Frame rate: `30 fps`
- Target platform family: TikTok / Reels / Shorts

The earlier local draft is reference evidence only, not source authority.

## Locked production artifacts

- `BRIEF.md`
- `SCRIPT.md`
- `STORYBOARD.md`

## Current checkpoint

The project is ready for implementation.

```text
BRIEF_LOCKED
  ↓
SCRIPT_LOCKED
  ↓
STORYBOARD_LOCKED
  ↓
IMPLEMENTATION_READY  ← current
  ↓
LOCAL_PREVIEW
  ↓
LOCAL_RENDER
  ↓
VIDEO_QA
  ↓
DONE
```

## Local execution responsibility

The local environment should:

1. clone/pull the repository;
2. install the documented dependencies;
3. implement or execute the current renderer contract;
4. generate preview/render artifacts;
5. report render errors or QA observations back to the repository workflow.

The local environment should not silently rewrite the brief, script, storyboard or reusable blocks to make rendering easier.

## Stop condition for current step

This step is complete when the repository contains the minimal implementation/config needed for a fresh local checkout to produce the first preview without hidden local source or legacy folders.
