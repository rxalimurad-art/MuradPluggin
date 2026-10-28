---
description: Turns the backlog in docs/11-backlog.md into the sprint board docs/30-board.md with dependencies and owners, ready for the build loop
---

Invoke the `studio-pipeline` skill. Build the board from the existing docs — do not invent scope.

1. Read `docs/11-backlog.md` (mandatory), `docs/20-architecture.md`, and any existing
   `docs/30-board.md`.
2. Write `docs/30-board.md` in the contract's board format: one row per backlog item with ID,
   title, owner (`ios-developer` unless the ticket is store assets — then `release-manager`),
   dependencies, status (`ready` only when every dependency is `done`), and an empty
   Verification cell.
3. Sanity-check the board: no circular dependencies, every backlog item appears exactly once,
   and the architect's structural-risk items are scheduled early. Fix violations you find.
4. Present the board to the user: total tickets, the first ready batch, and the dependency
   chain in one glance (a compact list is fine).

Log `stage_start`/`stage_end` for stage 6 (see Telemetry in the `studio-pipeline` skill).

Next step when ready: `/murad-ios-studio:app-build`.
