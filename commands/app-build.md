---
description: The build loop — runs ready board tickets through developer → reviewer → QA until done or blocked; $ARGUMENTS optionally limits to specific ticket IDs
argument-hint: [ticket-id ...]
---

Invoke the `studio-pipeline` skill and run stage 7 of its contract. Optional ticket IDs: $ARGUMENTS

1. Read `docs/30-board.md`, `docs/51-bugs.md`, `docs/90-telemetry.jsonl`, and the source-of-truth
   docs. Then self-heal before new work (see Self-healing in the `studio-pipeline` skill):
   tickets left in `in-progress`/`in-review`/`qa` by an earlier run resume at that status
   (`interrupted`), and every ticket the health check marks `stuck` gets its recovery first.
2. Select tickets: those in $ARGUMENTS if given, otherwise every `ready` ticket. If none are
   ready and nothing is in flight, report that and stop.
3. For each selected ticket, in dependency-safe order:
   a. Dispatch `ios-developer` with the ticket's full row and acceptance criteria.
   b. When it reports evidence, dispatch `code-reviewer` on the branch.
   c. APPROVED → dispatch `qa-engineer`. SHIP-level pass → ticket `done`.
   d. CHANGES or QA blockers/majors → ticket back to `in-progress`; loop again. A `REPEAT`
      finding or bug, or a failure class over its budget, escalates per Self-healing (usually
      to `ios-architect`) instead of another identical loop.
   e. Record everything on the board row: status, verdict, verification evidence, and log a
      `ticket` telemetry event for each status change you make (see Telemetry in the `studio-pipeline` skill).
4. A ticket that has failed three full loops stops the run — summarize and ask the user.
5. Close with the standup: tickets done this run, what self-healed (class → outcome), current board counts, open bugs, next ready
   batch, and any blockers (verbatim from the agents — do not soften them).

Never mark a ticket `done` yourself without the QA pass; never accept a developer's self-report
in place of recorded verification evidence.
