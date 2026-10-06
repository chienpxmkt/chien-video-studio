# Faceless Explainer Workflow v0.2

## Purpose

Turn a topic/script/notes into a faceless explainer using typography, diagrams, comparison, charts or supporting media.

First reference case: **SEO vs Paid Ads — `explainer-clean`**.

## Inputs

Minimum:
- goal;
- key message / script / source notes;
- target duration;
- aspect ratio;
- brand/frame context if relevant;
- must keep / must avoid;
- acceptance criteria.

## Gate-aware flow

```text
G0 Route & intake
→ G1 Brief/evidence
→ G2 Script lock
→ G3 Storyboard/assets
→ G4 Implementation ready
→ G5 Local preview
→ G6 Render/technical QA
→ G7 Human final
→ DONE
→ G8 Learn (optional)
```

## State entry

### Fresh

```text
IDEA → BRIEF_LOCKED
```

### Existing production

If a video already has a draft/render, reverse-map only enough state/evidence to resume safely.

Do not rebuild a working video merely to make the folder structure cleaner.

## 1. Lock message beats

Split content by what the viewer must understand, not by an arbitrary scene count.

Possible beats:
- hook;
- context/problem;
- core explanation;
- comparison/proof;
- takeaway/CTA.

Use only what is needed.

Gate target: `G2_SCRIPT`.

## 2. Build storyboard + asset plan

Every scene must have a clear purpose.

For every required media element, make its status visible:
- repo asset;
- approved external input;
- local/generated execution artifact;
- missing/blocker.

Prefer registry primitives when they genuinely fit. Do not promote one-off composition into registry prematurely.

Gate target: `G3_STORYBOARD_ASSETS`.

## 3. Lock timeline / implementation

Record explicit timing when the renderer needs it.

Do not micro-optimize timing before preview evidence proves the need.

Implementation must expose:
- renderer;
- entry;
- width/height;
- fps;
- duration;
- output path.

Gate target: `G4_IMPLEMENTATION`.

## 4. Local check + preview

Run repository-defined commands.

Inspect:
- message readability;
- hierarchy;
- overflow/safe area;
- missing media;
- obvious timing dead zones;
- motion competing with content.

Local reports evidence. It does not silently rewrite locked production intent.

Gate target: `G5_LOCAL_PREVIEW`.

## 5. Draft render + technical QA

Render the real artifact and verify:
- metadata;
- duration;
- frame integrity;
- timing;
- basic audio sync/levels when applicable;
- missing media/clipping.

Gate target: `G6_RENDER_QA`.

## 6. Human final review

Watch the full video at 1×.

Judge:
- hook;
- pacing;
- boring sections;
- whether visuals actually support the message;
- awkward/misleading presentation;
- acceptance criteria;
- publish readiness.

Technical validators cannot pass this gate.

Gate target: `G7_HUMAN_FINAL`.

## 7. Fix minimally

Fix the smallest evidenced issue first.

Do not rewrite the whole script/visual system because one layout or timing bug exists.

## 8. Finish

When all required gates and acceptance criteria pass → `DONE`.

## 9. Learn only when useful

If the video is published and meaningful analytics exist, record only learnings that should change future production.

`G8_LEARN` is optional and does not block `DONE`.

## Stop condition

The video meets acceptance criteria and all required gates pass.

Do not auto-create another template/block/workflow after completion.
