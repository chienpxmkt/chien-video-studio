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
- Preserve the current renderer unless a real production pain justifies replacement.
- Keep project-specific facts, claims, character canon and publication authority in the source project repo.
- Do not invent missing facts/assets. Mark the affected scope blocked.
- Make the smallest coherent change required by the task.

## Production lifecycle

`IDEA → BRIEF_LOCKED → READY_FOR_PRODUCTION → STORYBOARD_LOCKED → DRAFT_RENDER → QA → FINAL_RENDER → DONE`

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

## First reference case

Use the existing local `SEO vs Paid Ads` / `explainer-clean` video as the first migration/reference case. Preserve its working output while wrapping it with brief → storyboard/timeline → registry → QA conventions.
