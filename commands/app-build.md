---
description: The build loop — runs ready board tickets through developer → reviewer → QA until done or blocked; $ARGUMENTS optionally limits to specific ticket IDs
---

Invoke the `studio-pipeline` skill and run stage 7 of its contract. Optional ticket IDs: $ARGUMENTS

1. Read `docs/30-board.md`, `docs/51-bugs.md`, and the source-of-truth docs.
2. Select tickets: those in $ARGUMENTS if given, otherwise every `ready` ticket. If none are
   ready and nothing is in flight, report that and stop.
3. For each selected ticket, in dependency-safe order:
   a. Dispatch `ios-developer` with the ticket's full row and acceptance criteria.
   b. When it reports evidence, dispatch `code-reviewer` on the branch.
   c. APPROVED → dispatch `qa-engineer`. SHIP-level pass → ticket `done`.
   d. CHANGES or QA blockers/majors → ticket back to `in-progress`; loop again.
   e. Record everything on the board row: status, verdict, verification evidence.
4. A ticket that has failed three full loops stops the run — summarize and ask the user.
5. Close with the standup: tickets done this run, current board counts, open bugs, next ready
   batch, and any blockers (verbatim from the agents — do not soften them).

Never mark a ticket `done` yourself without the QA pass; never accept a developer's self-report
in place of recorded verification evidence.
