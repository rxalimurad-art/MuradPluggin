---
name: app-status
description: Standup — prints the project's current state — vision goal, board summary, open bugs, blockers, and the recommended next action. Use on a runtime with no dedicated /murad-ios-studio:app-status command (e.g. Codex, Gemini CLI).
---

This skill lives at `skills/app-status/SKILL.md` inside the `murad-ios-studio` plugin. Resolve the
path below relative to this file's own location (two directories up is the plugin root), not
relative to the user's project directory.

Read `../../commands/app-status.md` in this plugin and follow it exactly, stage by stage.

This runtime has no isolated subagent dispatch. Wherever that file says "delegate to
`<role>`", instead follow the "Running this contract on a runtime without subagents" section
of the `studio-pipeline` skill: open `../../agents/<role>.md`, adopt that persona for the step
in the current thread, then continue.
