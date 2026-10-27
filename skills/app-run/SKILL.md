---
name: app-run
description: The autonomous driver — takes an app idea from $ARGUMENTS through the full pipeline to App Store submission, pausing only at the scope-lock and ship gates. Use on a runtime with no dedicated /murad-ios-studio:app-run command (e.g. Codex, Gemini CLI).
---

This skill lives at `skills/app-run/SKILL.md` inside the `murad-ios-studio` plugin. Resolve the
path below relative to this file's own location (two directories up is the plugin root), not
relative to the user's project directory.

Read `../../commands/app-run.md` in this plugin and follow it exactly, stage by stage.

This command takes an argument (<one-line app idea>) treat whatever text the caller gave after invoking `$app-run` as `$ARGUMENTS` in that file.

This runtime has no isolated subagent dispatch. Wherever that file says "delegate to
`<role>`", instead follow the "Running this contract on a runtime without subagents" section
of the `studio-pipeline` skill: open `../../agents/<role>.md`, adopt that persona for the step
in the current thread, then continue.
