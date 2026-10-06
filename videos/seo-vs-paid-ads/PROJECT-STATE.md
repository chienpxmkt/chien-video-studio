# SEO vs Paid Ads — Project State

## Status

`IMPLEMENTATION_READY / G5_LOCAL_PREVIEW_PENDING`

## Workflow

`faceless-explainer`

## Canonical authority

This repository is the canonical production source for this video.

Local environments are execution targets only. They may install dependencies, preview, render and report evidence, but they do not define the canonical script, storyboard, timeline, registry or production rules unless deliberate changes are committed back.

## Technical target

- Video ID: `seo-vs-paid-ads`
- Working template direction: `explainer-clean`
- Renderer: `native-html`
- Orientation: vertical
- Aspect ratio: `9:16`
- Resolution: `1080 × 1920`
- Frame rate: `30 fps`
- Duration: `38s`
- Target platform family: TikTok / Reels / Shorts

## Locked production artifacts

- `BRIEF.md`
- `SCRIPT.md`
- `STORYBOARD.md`
- `project.json`
- `composition/index.html`
- `GATES.json`

## Gate checkpoint

```text
G0_ROUTE               PASS
G1_BRIEF_EVIDENCE      PASS
G2_SCRIPT              PASS
G3_STORYBOARD_ASSETS   PASS
G4_IMPLEMENTATION      PASS
G5_LOCAL_PREVIEW       PENDING  ← next
G6_RENDER_QA           PENDING
G7_HUMAN_FINAL         PENDING
G8_LEARN               PENDING / optional
```

No local preview/render/human-review evidence is claimed yet.

## Current implementation

The repository contains the minimum runnable implementation for a fresh local checkout:

```text
package.json
tools/check-gates.mjs
renderer/native/runtime.mjs
renderer/native/check.mjs
renderer/native/preview.mjs
renderer/native/render.mjs
videos/seo-vs-paid-ads/GATES.json
videos/seo-vs-paid-ads/project.json
videos/seo-vs-paid-ads/composition/index.html
```

Render path:

```text
composition
  ↓
Playwright / Chromium
  ↓
frame-by-frame capture
  ↓
FFmpeg
  ↓
renders/seo-vs-paid-ads.mp4
```

## Local next action

From a fresh checkout:

```bash
npm install
npm run setup:browser
npm run gates:seo-vs-paid-ads
npm run check:seo-vs-paid-ads
npm run preview:seo-vs-paid-ads
```

If preview is structurally correct:

```bash
npm run render:seo-vs-paid-ads
```

## What to report back

Only real execution evidence:
- install/runtime error;
- gate-validator result;
- preview screenshot issue;
- clipping/overflow;
- motion/timing issue;
- render/FFmpeg error;
- final MP4 metadata;
- obvious content/readability issue.

Do not silently rewrite brief/script/storyboard on the local machine.

## Stop condition for current step

G5 completes only when the fresh local check/preview has been inspected and evidence has been recorded.

The next repository change must be driven by that evidence, not speculative refactoring.
