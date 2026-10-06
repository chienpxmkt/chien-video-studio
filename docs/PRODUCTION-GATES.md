# Production Gates v0.3

## Why this exists

A video can be technically valid and still be boring, misleading, visually weak or not ready to publish.

Production Gates separates three things that should not be confused:

1. **Lifecycle state** — where the video is in the production flow.
2. **Gate status** — whether the evidence required to advance exists.
3. **Creative judgment** — whether a human actually considers the final video good enough.

A timestamp or a successful render is not enough to mark the whole video as done.

## Gate model

Gate statuses:

- `PENDING` — not evaluated yet.
- `PASS` — required evidence exists and the gate criteria are met.
- `FAIL` — evaluated and failed.
- `BLOCKED` — cannot be evaluated because an external dependency is missing.
- `N_A` — deliberately not applicable, with a reason.

A required gate may advance only when it is `PASS` or justified `N_A`.

## Canonical gates

### G0_ROUTE — Route & intake

Purpose: decide what is being produced and which workflow owns it.

Minimum evidence:
- video id;
- selected workflow;
- goal;
- target format;
- acceptance criteria.

Typical repo evidence:
- `BRIEF.md`;
- workflow reference.

### G1_BRIEF_EVIDENCE — Brief & evidence

Purpose: lock the production intent and prevent invented claims/assets.

Minimum evidence:
- approved inputs;
- unresolved inputs explicitly listed;
- claim/source evidence when the video makes factual claims;
- source-project authority when another repo owns facts or brand decisions.

For creative/non-factual videos, source research may be `N_A`, but the reason must be explicit.

### G2_SCRIPT — Script lock

Purpose: lock what is being said before visual implementation.

Check:
- hook/message beats are coherent;
- no unresolved factual placeholders;
- duration is plausible;
- script is approved enough for production.

This gate is content-level. Technical render success cannot pass it.

### G3_STORYBOARD_ASSETS — Storyboard & asset plan

Purpose: map message beats to scenes and required media.

Check:
- every scene has a purpose;
- required media/voice/graphics are identified;
- missing assets are visible as blockers;
- provenance/usage constraints are known when relevant;
- registry reuse is considered before new primitives are created.

### G4_IMPLEMENTATION — Timeline & implementation ready

Purpose: prove the repo contains enough deterministic implementation for a local machine to execute.

Check:
- project config exists;
- timeline/composition is reproducible;
- renderer entry is explicit;
- target width/height/fps/duration are explicit;
- required repo assets resolve;
- implementation does not depend on hidden local source.

### G5_LOCAL_PREVIEW — Check & preview

Purpose: catch structural problems before paying the cost of a full render.

Local evidence may include:
- dependency/runtime check;
- preview screenshot or preview URL;
- safe-area/overflow observation;
- missing-media check;
- obvious timing/motion issue notes.

A local machine may report evidence. It must not silently rewrite production intent.

### G6_RENDER_QA — Draft render & technical QA

Purpose: validate the actual rendered artifact.

Minimum checks when applicable:
- render completed;
- resolution/aspect ratio;
- fps;
- duration;
- audio/video duration delta;
- missing frames/media;
- text clipping/overflow;
- obvious dead air/gaps/overlaps;
- basic audio level/sync;
- render integrity.

A technical pass only means the artifact is technically coherent.

### G7_HUMAN_FINAL — Human final review

Purpose: stop the system from confusing “technically correct” with “worth publishing”.

This is a hard human gate.

Review the full video at 1× and ask:
- does the hook work?
- is any section boring or needlessly slow?
- do visuals actually support the narration/message?
- is anything misleading or awkward?
- does the video satisfy the acceptance criteria?
- would we publish this version?

This gate must not be auto-passed by a validator.

### G8_LEARN — Post-publish learning

Optional and non-blocking for `DONE`.

When analytics exist, capture only evidence that changes future production decisions:
- 3s/5s retention;
- average watch time;
- completion rate;
- thumbnail/cover CTR where relevant;
- repeated drop-off point;
- comments/saves/shares when meaningful.

Do not create a giant analytics system before enough real videos exist.

## Lifecycle mapping

```text
IDEA
  ↓ G0
BRIEF_LOCKED
  ↓ G1
SCRIPT_LOCKED
  ↓ G2
STORYBOARD_LOCKED
  ↓ G3
IMPLEMENTATION_READY
  ↓ G4
LOCAL_PREVIEW
  ↓ G5
DRAFT_RENDER
  ↓ G6
QA / FINAL_RENDER
  ↓ G7
DONE
  ↓
G8_LEARN (optional)
```

The lifecycle remains readable for humans. `GATES.json` records the machine-checkable evidence.

## Evidence rules

Use evidence prefixes:

- `repo:path/to/file` — repository file; validator checks it exists.
- `local:...` — local execution evidence; cannot be verified by repo-only checks.
- `external:...` — source project / external authority.
- `human:...` — explicit human review evidence.

A `PASS` gate must contain evidence. Evidence should prove the gate, not merely repeat its status.

## BLOCKED rule

A blocked gate must state:
- blocker;
- affected scope;
- owner/source needed;
- minimum next action.

Do not open unrelated work to compensate for a blocker.

## Design constraint

Do not turn this into ten layers of bureaucracy.

The gate system exists to make failures visible, preserve evidence and keep local execution deterministic. If a gate or field does not prevent a real class of production error, do not add it.
