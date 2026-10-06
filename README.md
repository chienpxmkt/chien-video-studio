# Chiến Video Studio

`chien-video-studio` là **video production system dùng chung** cho các dự án của Chiến: faceless explainer, social promo, fashion/affiliate, product showcase và B2B product video.

Mục tiêu của repo không phải xây một framework video khổng lồ. Mục tiêu là biến brief/content đã được chốt thành video có thể kiểm tra, render, tái sử dụng và cải tiến dần từ production thật.

## Architecture v0.3 — evidence-based production gates

```text
REQUEST
   ↓
Video Router
   ↓
G0 Route & Intake
   ↓
G1 Brief & Evidence
   ↓
G2 Script Lock
   ↓
G3 Storyboard & Asset Plan
   ↓
G4 Timeline / Implementation Ready
   ↓
LOCAL EXECUTION
   ↓
G5 Check & Preview
   ↓
G6 Draft Render & Technical QA
   ↓
G7 Human Final Review
   ↓
DONE
   ↓
G8 Learn (optional)
```

The important change in v0.3 is simple:

> **state is not evidence, and technical PASS is not creative approval.**

A video advances because the required gate has evidence, not because a timestamp or render command exists.

See `docs/PRODUCTION-GATES.md`.

## Core principles

1. **Route once** — khi workflow/brief đã khóa thì resume từ state hiện tại, không tự nghĩ lại toàn bộ concept.
2. **Reuse before create** — ưu tiên block/scene/template đã có trước khi hand-build mới.
3. **Renderer replaceable** — workflow/storyboard/timeline nằm trên renderer; renderer có thể được thay hoặc bổ sung sau này mà không viết lại production intent.
4. **Evidence before status** — gate `PASS` phải có bằng chứng.
5. **Human final gate** — validator không được tự quyết định video “hay” hoặc “đáng publish”.

## Four architecture planes

### 1. Control plane — GitHub repo

Owns:
- router/workflow choice;
- lifecycle state;
- gate manifest;
- evidence references;
- approvals/blockers;
- canonical production intent.

### 2. Production plane — repo

Owns:
- brief;
- script;
- storyboard;
- asset plan;
- timeline/composition;
- registry;
- renderer adapter.

### 3. Execution plane — local machine

Owns only execution:
- install runtime;
- check;
- preview;
- render;
- probe metadata;
- technical QA evidence.

Local is **not** an alternate source of truth.

### 4. Feedback plane — optional

After publish, only useful performance evidence is fed back into future decisions. Do not build a large analytics layer before real production proves the need.

## Repo-first execution model

```text
GitHub repository
= source of truth for production intent + implementation + gate state

Local machine
= execution environment for check + preview + render + QA evidence
```

A fresh clone must contain enough source/config to reproduce the intended video when the documented runtime/dependencies are available.

## Production states

```text
IDEA
→ BRIEF_LOCKED
→ SCRIPT_LOCKED
→ STORYBOARD_LOCKED
→ IMPLEMENTATION_READY
→ LOCAL_PREVIEW
→ DRAFT_RENDER
→ QA
→ FINAL_RENDER
→ DONE
```

`BLOCKED` records the blocker, affected scope, owner/source needed and minimum next action.

State is human-readable progress. `GATES.json` is the evidence ledger that permits progress.

## Gate check

Generic:

```bash
npm run gates:check -- <video-id>
```

Reference case:

```bash
npm run gates:seo-vs-paid-ads
```

The repo-only validator checks manifest integrity and `repo:` evidence. Local/human evidence still requires the appropriate executor/reviewer.

## First runnable project

`videos/seo-vs-paid-ads/`

- workflow: `faceless-explainer`
- renderer: `native-html`
- target: `1080 × 1920`, `30 fps`, `38s`
- visual direction: `explainer-clean`
- current gate: `G5_LOCAL_PREVIEW`

### Local setup

Requirements:
- Node.js 22+
- FFmpeg on `PATH`

```bash
git clone https://github.com/chienpxmkt/chien-video-studio.git
cd chien-video-studio
npm install
npm run setup:browser
```

### Validate gate manifest

```bash
npm run gates:seo-vs-paid-ads
```

### Check

```bash
npm run check:seo-vs-paid-ads
```

### Preview

```bash
npm run preview:seo-vs-paid-ads
```

### Render MP4

```bash
npm run render:seo-vs-paid-ads
```

Output:

```text
renders/seo-vs-paid-ads.mp4
```

`renders/` is not committed by default.

## Current renderer

V0 renderer remains deliberately small:

```text
HTML/CSS/JS composition
      ↓
Playwright / Chromium
      ↓
deterministic frame capture
      ↓
FFmpeg
      ↓
MP4
```

The renderer is replaceable. Do not migrate to HyperFrames/Remotion merely for architectural neatness. Add an adapter only when real production proves a material benefit.

## Repo boundary

`chien-video-studio` owns:
- video routing/workflow;
- production gates and technical evidence model;
- script/storyboard/timeline implementation;
- reusable video blocks/scenes/transitions;
- media placement/treatment;
- technical/video QA;
- preview/render/export workflow.

This repo does **not** own the canonical source of truth for:
- Daisy character canon;
- VNP/VNMW facts, claims or publication authority;
- client campaign/business strategy;
- personal priorities from `chien-life-os`.

Source repos hand off approved inputs, constraints and acceptance criteria. This repo produces the video.

## Initial workflows

```text
workflows/
├── faceless-explainer/
├── fashion-lookbook/
├── product-showcase/
├── b2b-product-video/
└── general-video/
```

Only develop a workflow when a real video needs it.

## Registry

```text
registry/
├── blocks/
├── scenes/
├── transitions/
└── templates/
```

Promote a primitive only after real reuse or repeated production pain proves the need.

## Current priority

1. Validate `GATES.json` for `SEO vs Paid Ads`.
2. Run fresh-clone local check + preview.
3. Add only real G5 evidence and fix only evidenced issues.
4. Render MP4 and complete G6 technical QA.
5. Require a human full-watch before G7 passes.
6. Only then mark the video `DONE`.
7. Extract reusable scene/block patterns only after real use proves reuse value.

Details:
- `docs/ARCHITECTURE.md`
- `docs/PRODUCTION-GATES.md`
- `docs/LOCAL-EXECUTION-CONTRACT.md`
