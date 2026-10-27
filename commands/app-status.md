---
description: Standup — prints the project's current state — vision goal, board summary, open bugs, blockers, and the recommended next action
---

Invoke the `studio-pipeline` skill and give the user a standup from the docs — no new work.

Read `docs/00-vision.md`, `docs/30-board.md`, `docs/51-bugs.md`, and `docs/60-release.md` (skip
any that don't exist yet). Then report, compactly:

1. **Goal**: the vision's success metric and where the project stands against it (or "no vision
   yet" with the suggested first step).
2. **Board**: counts per status, then the in-flight tickets with owner and their last evidence.
3. **Bugs**: open blockers and majors, one line each.
4. **Blockers**: anything agents flagged for the user, verbatim.
5. **Next**: the single most useful action right now, with the exact command to run it.

If nothing exists yet, say so and point to `/murad-ios-studio:app-run`.
