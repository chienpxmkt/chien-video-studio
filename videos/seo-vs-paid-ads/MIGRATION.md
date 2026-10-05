# SEO vs Paid Ads — Migration Plan

## Goal

Move the existing local `seo-vs-paid-ads-clean` project into `chien-video-studio` without changing the visible/audio baseline first.

## Migration rule

**Preserve before refactor.**

The first repository-backed render should reproduce the local draft as closely as practical. Architecture cleanup comes only after the baseline is reproducible.

## Phase 1 — Sync local source

Copy the current local project source into this repository, including only files required to build/render the video.

Expected categories:

- composition/source code;
- template implementation used by `explainer-clean`;
- referenced images/media;
- audio/voice/music if locally owned or redistributable;
- config/scripts needed to preview/render.

Do not commit:

- credentials/tokens;
- generated caches;
- unnecessary build artifacts;
- third-party media that cannot legally be redistributed;
- large rendered MP4 files unless there is a clear reason.

## Phase 2 — Baseline verification

After sync:

1. install dependencies from the repo;
2. run the existing render command unchanged where possible;
3. verify `1080 × 1920`;
4. verify `30 fps`;
5. compare duration/frame count against the known `1,155`-frame draft;
6. visually inspect layout, typography, transitions, timing and audio;
7. record differences before changing architecture.

## Phase 3 — Map into V0.2

Only after baseline verification:

- lock a minimal `BRIEF`;
- express scene order in storyboard form;
- map timing into timeline IR where useful;
- identify existing reusable blocks;
- extract `explainer-clean` only when at least one real reuse case exists;
- keep renderer-specific code behind the renderer boundary.

## Phase 4 — Controlled refactor

Refactor one layer at a time:

```text
source preserved
  ↓
brief/storyboard state
  ↓
scene/block extraction
  ↓
registry reuse
  ↓
renderer adapter boundary
```

Every refactor must still render successfully before the next layer moves.

## Current blockers

- Exact local folder structure: `PENDING_LOCAL_SYNC`
- Exact source files: `PENDING_LOCAL_SYNC`
- Exact assets/audio inventory: `PENDING_LOCAL_SYNC`
- Exact render command/dependencies: `PENDING_LOCAL_SYNC`

These blockers must be resolved from the actual local project, not reconstructed from memory.
