---
description: Release stage — prepares all store assets and the TestFlight/App Store upload via the release manager and QA sign-off, then stops at GATE 2 for user confirmation; $ARGUMENTS optionally sets the version
---

Invoke the `studio-pipeline` skill and run stage 8. Optional version: $ARGUMENTS

1. Read `docs/30-board.md` and `docs/51-bugs.md`. If any ticket is not `done` or any blocker/major
   bug is open, say so and ask the user whether to proceed anyway — a release with known open
   blockers needs an explicit user waiver, recorded in `docs/60-release.md`.
2. Dispatch `qa-engineer` to run the full test plan against the release build and give an
   explicit SHIP or NO-SHIP verdict. On NO-SHIP: list the blockers and stop.
3. Dispatch `release-manager` (it follows the `store-release` skill) to prepare the version
   ($ARGUMENTS or next logical version), archive, screenshots, metadata, privacy manifest, and
   the pre-flight checklist in `docs/60-release.md`.
4. Present the readiness summary: checklist status (green/waived/blocked), artifact paths, the
   exact pending command(s) (e.g. `fastlane pilot` / `deliver --submit_for_review`).
5. **GATE 2**: ask the user to confirm the upload and its target (TestFlight only, or submit for
   App Store review). No confirmation, no upload. Record the decision in `docs/60-release.md`.
6. On confirmation, have `release-manager` execute and report build/submission IDs, status, and
   any processing wait.

If fastlane or signing credentials are missing, report exactly what's missing for the user to
provide — never improvise credentials.
