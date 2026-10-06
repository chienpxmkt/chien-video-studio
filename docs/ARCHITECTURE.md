# Chiến Video Studio Architecture v0.3

## 1. Purpose

Build a lean production system where AI can turn approved inputs into a reproducible video, while keeping creative authority, evidence and renderer execution clearly separated.

The system prioritizes **real production before framework growth**.

## 2. Architecture planes

```text
SOURCE PROJECT / APPROVED INPUTS
            ↓
┌──────────────────────────────────────┐
│ CONTROL PLANE — GitHub               │
│ Router · lifecycle · gates · evidence│
│ blockers · approvals                 │
└──────────────────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ PRODUCTION PLANE — GitHub            │
│ Brief · Script · Storyboard · Assets │
│ Timeline · Registry · Composition    │
└──────────────────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ EXECUTION PLANE — Local              │
│ Check · Preview · Render · Probe     │
│ Technical QA evidence                │
└──────────────────────────────────────┘
            ↓
       HUMAN FINAL GATE
            ↓
           DONE
            ↓
┌──────────────────────────────────────┐
│ FEEDBACK PLANE — optional            │
│ Publish analytics → useful learnings │
└──────────────────────────────────────┘
```

## 3. Why gates are separate from state

Lifecycle state answers:

> Where is the production?

Gate status answers:

> What evidence allows it to advance?

Creative judgment answers:

> Is this actually good enough to publish?

These are intentionally separate.

A successful render can pass technical checks and still fail final human review.

## 4. Source-of-truth model

```text
GitHub repository
= canonical production intent + implementation + gate ledger

Local machine
= execution environment
```

Local may install dependencies, preview, render, probe and return evidence. Local must not silently become an alternate source.

## 5. Router

Router answers only:

> Which workflow owns this deliverable?

Initial routes:
- explain topic/text → `faceless-explainer`;
- Daisy fashion/affiliate/lookbook → `fashion-lookbook`;
- product/company showcase → `product-showcase`;
- export/B2B product explainer → `b2b-product-video`;
- unclear fit → `general-video`.

### Route once

Once workflow and brief are locked:
- layout/motion edits do not route again;
- QA fixes do not reopen concept unless a blocker proves they must;
- a specific edit changes only the requested scope;
- a genuinely new deliverable routes again.

## 6. Production Gates

Canonical gate order:

```text
G0_ROUTE
G1_BRIEF_EVIDENCE
G2_SCRIPT
G3_STORYBOARD_ASSETS
G4_IMPLEMENTATION
G5_LOCAL_PREVIEW
G6_RENDER_QA
G7_HUMAN_FINAL
G8_LEARN (optional)
```

Detailed criteria live in `docs/PRODUCTION-GATES.md`.

### Gate rule

A required gate advances only with:
- `PASS`; or
- justified `N_A`.

`PASS` requires evidence.

`BLOCKED` requires blocker + affected scope + owner/source + minimum next action.

## 7. Lifecycle state

Canonical state:

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

`BLOCKED` is an interrupt state with explicit recovery information.

State stays simple for humans. `GATES.json` carries structured gate evidence.

## 8. Workflow owns the deliverable

Workflow owns the end-to-end production path.

Example:

```text
faceless-explainer
brief
→ script
→ storyboard/assets
→ timeline/composition
→ preview
→ render
→ technical QA
→ human final
```

A shared capability never owns the deliverable.

## 9. Intermediate representation

Workflow must not be tightly coupled to renderer implementation.

Minimum layering:

```text
Brief
  ↓
Script
  ↓
Storyboard
  ↓
Timeline / project config when useful
  ↓
Renderer adapter
```

Only add IR fields when production actually needs them.

## 10. Renderer boundary

Current native renderer:

```text
renderer/native/
  runtime.mjs
  check.mjs
  preview.mjs
  render.mjs
```

Path:

```text
HTML/CSS/JS composition
      ↓
Playwright / Chromium
      ↓
frame-by-frame capture
      ↓
FFmpeg
      ↓
MP4
```

Renderer remains replaceable.

Do not migrate to HyperFrames/Remotion only because the abstraction looks cleaner. Consider another adapter only when it materially improves capability, cost, speed, batch production or reuse.

## 11. Deterministic production

Prefer:
- explicit timing;
- explicit asset path/version;
- no render-time randomness;
- finite animations;
- frame state driven by explicit time, not wall-clock;
- same input → consistent frame logic;
- probe/render metadata captured when needed for QA.

## 12. Asset and source boundary

G3 must make missing media visible before implementation.

When relevant, track:
- source/provenance;
- usage constraints;
- approved voice/media;
- required graphics;
- unresolved asset dependencies.

Do not invent missing source material merely to make the pipeline continue.

## 13. Registry

```text
registry/
├── blocks/
├── scenes/
├── transitions/
└── templates/
```

Rule:

```text
Need
→ search registry
→ reuse if fit
→ adapt if small delta
→ create only when necessary
```

Promote a component only after reuse or repeated production pain proves value.

## 14. FRAME.md

`FRAME.md` translates brand/content direction into video rules without replacing the source project's canonical brand system.

It may contain:
- aspect ratio defaults;
- typography scale;
- caption/title style;
- safe zones;
- scene density;
- pacing;
- motion intensity;
- preferred/forbidden transitions;
- media treatment;
- CTA visual rules.

## 15. QA split

### Automated/repo checks

Can verify:
- gate manifest integrity;
- repository evidence exists;
- project config is present;
- deterministic entry points are present.

### Local technical QA

Can verify:
- runtime/dependency execution;
- resolution/aspect ratio;
- fps/duration;
- visual overflow/safe area;
- text clipping;
- missing media;
- timing gaps/overlaps;
- basic audio sync/levels;
- render integrity.

### Human final QA

Must judge:
- hook strength;
- pacing/boring sections;
- semantic fit of visuals;
- awkwardness;
- misleading presentation;
- acceptance criteria;
- publish readiness.

Technical automation must not auto-pass this layer.

### Source-project QA

Still owns:
- factual truth;
- claim approval;
- character canon;
- business message;
- experiment hypothesis;
- publication/brand authority.

## 16. Feedback loop

`G8_LEARN` is optional and does not block `DONE`.

Only capture post-publish metrics that can change future production decisions. Avoid building a large analytics system before enough real videos exist.

## 17. First canonical case

`SEO vs Paid Ads` validates v0.3.

Current expected progression:

```text
G0 PASS
G1 PASS
G2 PASS
G3 PASS
G4 PASS
G5 PENDING  ← fresh local preview next
G6 PENDING
G7 PENDING
G8 PENDING / optional
```

No local preview/render evidence should be fabricated in the repo.

## 18. Anti-overengineering rules

Do not build without a real use case:
- full NLE editor;
- cloud render farm;
- complete multi-renderer abstraction;
- dozens of workflows;
- large speculative block catalogs;
- autonomous self-improvement;
- analytics warehouse;
- agent-platform plugin packaging.

Any new abstraction must answer:

> Which real production error, delay or repeated pain does this remove?
