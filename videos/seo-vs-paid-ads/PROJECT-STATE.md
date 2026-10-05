# SEO vs Paid Ads — Project State

## Status

`IMPLEMENTATION_READY / LOCAL_PREVIEW_PENDING`

## Workflow

`faceless-explainer`

## Canonical authority

This repository is the canonical production source for this video.

Local environments are execution targets only. They may install dependencies, preview, render and report results, but they do not define the canonical script, storyboard, timeline, registry or production rules unless those changes are committed back through the repository workflow.

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

## Current implementation

The repository now contains the minimum runnable implementation for a fresh local checkout:

```text
package.json
renderer/native/runtime.mjs
renderer/native/check.mjs
renderer/native/preview.mjs
renderer/native/render.mjs
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

## Current checkpoint

```text
BRIEF_LOCKED
  ↓
SCRIPT_LOCKED
  ↓
STORYBOARD_LOCKED
  ↓
IMPLEMENTATION_READY
  ↓
LOCAL_PREVIEW  ← next
  ↓
DRAFT_RENDER
  ↓
VIDEO_QA
  ↓
DONE
```

## Local next action

From a fresh checkout:

```bash
npm install
npm run setup:browser
npm run check:seo-vs-paid-ads
npm run preview:seo-vs-paid-ads
```

If preview is structurally correct, run:

```bash
npm run render:seo-vs-paid-ads
```

## What to report back

Only evidence from execution:

- install/runtime error;
- preview screenshot issue;
- clipping/overflow;
- motion/timing issue;
- render/FFmpeg error;
- final MP4 metadata;
- obvious content/readability issue.

Do not silently rewrite brief/script/storyboard on the local machine.

## Stop condition for current step

This implementation step is complete when a fresh local checkout can open the first preview. The next repository change should be driven by preview/render evidence, not speculative refactoring.
