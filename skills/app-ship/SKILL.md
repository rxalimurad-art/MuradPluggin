---
name: app-ship
description: Release stage — prepares all store assets and the TestFlight/App Store upload via the release manager and QA sign-off, then stops at GATE 2 for user confirmation; $ARGUMENTS optionally sets the version. Use on a runtime with no dedicated /murad-ios-studio:app-ship command (e.g. Codex, Gemini CLI).
---

This skill lives at `skills/app-ship/SKILL.md` inside the `murad-ios-studio` plugin. Resolve the
path below relative to this file's own location (two directories up is the plugin root), not
relative to the user's project directory.

Read `../../commands/app-ship.md` in this plugin and follow it exactly, stage by stage.

This command takes an argument ([version]) treat whatever text the caller gave after invoking `$app-ship` as `$ARGUMENTS` in that file.

This runtime has no isolated subagent dispatch. Wherever that file says "delegate to
`<role>`", instead follow the "Running this contract on a runtime without subagents" section
of the `studio-pipeline` skill: open `../../agents/<role>.md`, adopt that persona for the step
in the current thread, then continue.
