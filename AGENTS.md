# Chiến Video Studio — Agent Instructions

## Purpose

Maintain a lean, reusable video production system. Prefer shipping real videos over expanding framework surface area.

## Mandatory start

Before changing a production task, read in order:

1. `AGENTS.md`
2. `README.md`
3. `docs/ARCHITECTURE.md`
4. active video brief/state files
5. relevant brand `FRAME.md`
6. relevant workflow and registry entries

## Working rules

- Route a fresh deliverable once, then resume from recorded state.
- Do not reopen strategy/brief decisions during a technical edit unless a blocker proves the brief must change.
- Reuse existing blocks/scenes/templates before creating new ones.
- Keep workflow/storyboard/timeline logic independent from renderer-specific implementation where practical.
- Keep renderer replaceable; do not migrate renderer merely for architectural neatness.
- Keep project-specific facts, claims, character canon and publication authority in the source project repo.
- Do not invent missing facts/assets. Mark the affected scope blocked.
- Make the smallest coherent change required by the task.
- Local machines execute repository-defined work; they do not become an alternate source of truth.

## Production lifecycle

`IDEA → BRIEF_LOCKED → SCRIPT_LOCKED → STORYBOARD_LOCKED → IMPLEMENTATION_READY → LOCAL_PREVIEW → DRAFT_RENDER → QA → FINAL_RENDER → DONE`

`BLOCKED` must record blocker, affected scope and minimum next action.

## QA

Technical QA belongs here. Brand/content/fact approval belongs to the source project.

Before final render, verify at minimum:

- duration;
- resolution/aspect ratio;
- fps;
- text overflow/safe area;
- missing media;
- obvious timing gaps/overlaps;
- basic audio sync/levels when audio exists;
- render completed without integrity errors.

## Stop condition

When acceptance criteria pass, stop.

Do not automatically:

- build another workflow;
- refactor unrelated renderer code;
- create additional brand systems;
- automate a manual step that has not repeated enough to justify it;
- expand registry for hypothetical future use.

## First canonical case

`SEO vs Paid Ads` is the first repo-first reference case.

The repository owns its brief, script, storyboard, composition and execution commands. Local machines only run check/preview/render and report evidence back.

Do not attempt to preserve or migrate an older hidden local implementation. Previous local renders are reference evidence only.
