---
description: The autonomous driver — takes an app idea from $ARGUMENTS through the full pipeline to App Store submission, pausing only at the scope-lock and ship gates
argument-hint: <one-line app idea>
---

Run the Murad iOS Studio pipeline end to end. Start by invoking the `studio-pipeline` skill and
following its contract exactly. Log telemetry as you go: `stage_start`/`stage_end` around every
stage, a `gate` event after each gate answer, and `ticket` events for status changes you make
(see Telemetry in the `studio-pipeline` skill).

The idea: $ARGUMENTS

If no idea was given, ask the user for one line describing the app before doing anything else.

## 0. Detect the starting point
- If the current directory is empty (no code, no docs/): greenfield — proceed with stage 1.
- If the directory already contains an iOS app: brownfield is not supported in v1 — say so,
  point to the roadmap in the plugin README, and stop. Do not attempt to retrofit.

## 1. Plan (stages 1–5 of the contract)
Drive the stages in order by delegating to the plugin's agents (use the Agent tool; pass each
agent its exact inputs from the contract):
1. `app-researcher` with the idea → `docs/01-research.md`.
2. Write `docs/00-vision.md` yourself from the research (one page: what, who, why now, success).
3. `product-manager` → `docs/10-prd.md` + `docs/11-backlog.md`.
4. `ux-designer` → `docs/12-design.md`, then `icon-designer` → `docs/13-icon.md` + `design/icon/`.
5. `ios-architect` → `docs/20-architecture.md`.

## 2. GATE 1 — scope-lock
Summarize to the user: the differentiated idea (2 sentences), the MVP Must list, the module map, the bundle ID (e.g. `com.<name>.<app>`), the app icon (show `design/icon/AppIcon.appiconset/AppIcon-1024.png`),
and the top risk. Ask a single clear approve/revise question. On revise: apply the user's change
to the affected docs (re-delegate only the affected stage), then ask again. On approval: proceed.
Do not write any code before approval.

## 3. Board
Turn `docs/11-backlog.md` into `docs/30-board.md` per the contract's board format. Verify no
ticket is `ready` while its dependency is not `done`; fix the ordering before proceeding.

## 4. Build loop
Repeat until every ticket is `done` or the loop is blocked:
1. Pick every ticket whose dependencies are all `done` (start with one if this is round one).
2. For each: dispatch `ios-developer` (implement + verify) → `code-reviewer` (verdict) → on
   CHANGES back to developer, on APPROVED `qa-engineer`.
3. QA blockers/majors send the ticket back to `in-progress`; minors go to the backlog.
4. Enforce the contract: a ticket only reaches `in-review` with build+test+screenshot evidence
   recorded on its row.
5. After each round, give the user a 5-line standup: done / in-flight / blocked / next.

Self-heal as you go per the contract's Self-healing section: run the health check before each
round, resume interrupted tickets, follow each failure class's recovery and budget, and escalate
`REPEAT` findings to `ios-architect`. Include what self-healed in each standup.

If every remaining ticket is blocked or a ticket has failed three loops, stop and ask the user.

## 5. Release + GATE 2
Dispatch `release-manager` to prepare everything per the `store-release` skill and confirm QA's
ship sign-off. Present the readiness summary and ask the user to confirm upload (TestFlight or
App Store submission). Only on explicit confirmation, have `release-manager` execute the upload.
Report the result: build/submission IDs, status, and links recorded in `docs/60-release.md`.
