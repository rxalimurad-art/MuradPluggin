---
description: Stages 1–5 only — research the idea in $ARGUMENTS and produce the vision, PRD, design, and architecture docs, then stop at GATE 1 (scope-lock)
argument-hint: <one-line app idea>
---

Invoke the `studio-pipeline` skill and run stages 1–5 of its contract for this idea: $ARGUMENTS

If no idea was given, ask for one line first.

Steps:
1. Delegate to `app-researcher` (it writes `docs/01-research.md`).
2. Write `docs/00-vision.md` yourself from the research: what the app is, who it's for, why now,
   and how success is measured. One page.
3. Delegate to `product-manager` → `docs/10-prd.md` + `docs/11-backlog.md`.
4. Delegate to `ux-designer` → `docs/12-design.md`.
5. Delegate to `ios-architect` → `docs/20-architecture.md`.

Then execute GATE 1 from the contract: summarize the plan (differentiated idea in 2 sentences,
MVP Must list, module map, top risk) and ask the user to approve or revise. Write no code.
Log `stage_start`/`stage_end` telemetry around each stage and a `gate` event with the user's
answer (see Telemetry in the `studio-pipeline` skill).

Report what was created (the doc list) and the gate outcome. If the user approves, suggest
`/murad-ios-studio:app-plan` next.
