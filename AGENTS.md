# Chiến Video Studio — Agent Instructions

## Purpose

Maintain a lean, evidence-based video production system. Prefer shipping real videos over expanding framework surface area.

## Mandatory start

Before changing a production task, read in order:

1. `AGENTS.md`
2. `README.md`
3. `docs/ARCHITECTURE.md`
4. `docs/PRODUCTION-GATES.md`
5. active video `BRIEF.md`, `PROJECT-STATE.md` and `GATES.json`
6. relevant brand `FRAME.md` if one exists
7. relevant workflow and registry entries

## Working rules

- Route a fresh deliverable once, then resume from recorded state.
- Do not reopen strategy/brief decisions during a technical edit unless evidence proves the brief must change.
- Reuse existing blocks/scenes/templates before creating new ones.
- Keep workflow/storyboard/timeline logic independent from renderer-specific implementation where practical.
- Keep renderer replaceable; do not migrate renderer merely for architectural neatness.
- Keep project-specific facts, claims, character canon and publication authority in the source project repo.
- Do not invent missing facts/assets. Mark the affected gate blocked.
- Make the smallest coherent change required by the task.
- Local machines execute repository-defined work; they do not become an alternate source of truth.

## Evidence rule

A gate status is not evidence.

For every `PASS`:
- point to evidence;
- use `repo:`, `local:`, `external:` or `human:` evidence labels;
- do not fabricate local/human evidence;
- do not treat timestamps as proof by themselves.

## Production lifecycle

`IDEA → BRIEF_LOCKED → SCRIPT_LOCKED → STORYBOARD_LOCKED → IMPLEMENTATION_READY → LOCAL_PREVIEW → DRAFT_RENDER → QA → FINAL_RENDER → DONE`

`BLOCKED` must record blocker, affected scope, owner/source needed and minimum next action.

## Production gates

`G0_ROUTE → G1_BRIEF_EVIDENCE → G2_SCRIPT → G3_STORYBOARD_ASSETS → G4_IMPLEMENTATION → G5_LOCAL_PREVIEW → G6_RENDER_QA → G7_HUMAN_FINAL → G8_LEARN(optional)`

A required gate advances only on `PASS` or justified `N_A`.

`G7_HUMAN_FINAL` must never be auto-passed by a technical validator.

## QA

Technical QA belongs here. Brand/content/fact approval belongs to the source project.

Before final render, verify at minimum when applicable:
- duration;
- resolution/aspect ratio;
- fps;
- text overflow/safe area;
- missing media;
- obvious timing gaps/overlaps;
- basic audio sync/levels;
- render integrity.

Before `DONE`, require human full-watch evidence for:
- hook/pacing;
- semantic visual fit;
- obvious awkwardness;
- acceptance criteria;
- publish readiness.

## Stop condition

When acceptance criteria and required gates pass, stop.

Do not automatically:
- build another workflow;
- refactor unrelated renderer code;
- create additional brand systems;
- automate a manual step that has not repeated enough to justify it;
- expand registry for hypothetical future use;
- create post-publish analytics machinery without enough evidence.

## First canonical case

`SEO vs Paid Ads` is the first repo-first reference case.

The repository owns its brief, script, storyboard, composition, gate ledger and execution commands. Local machines only run check/preview/render and report real evidence back.

Do not preserve or migrate an older hidden local implementation. Previous local renders are reference evidence only.
