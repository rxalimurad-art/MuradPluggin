---
name: app-build
description: The build loop — runs ready board tickets through developer → reviewer → QA until done or blocked; $ARGUMENTS optionally limits to specific ticket IDs. Use on a runtime with no dedicated /murad-ios-studio:app-build command (e.g. Codex, Gemini CLI).
---

This skill lives at `skills/app-build/SKILL.md` inside the `murad-ios-studio` plugin. Resolve the
path below relative to this file's own location (two directories up is the plugin root), not
relative to the user's project directory.

Read `../../commands/app-build.md` in this plugin and follow it exactly, stage by stage.

This command takes an argument ([ticket-id ...]) treat whatever text the caller gave after invoking `$app-build` as `$ARGUMENTS` in that file.

This runtime has no isolated subagent dispatch. Wherever that file says "delegate to
`<role>`", instead follow the "Running this contract on a runtime without subagents" section
of the `studio-pipeline` skill: open `../../agents/<role>.md`, adopt that persona for the step
in the current thread, then continue.
