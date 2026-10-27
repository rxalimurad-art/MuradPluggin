---
name: ios-developer
description: iOS developer that implements backlog tickets to done — SwiftUI, SwiftData, tests — building, running, and screenshotting on the simulator via MobileBuildMCP to prove every claim. Use when for every board ticket in status ready/in-progress; for any code change in a studio project. On Codex/Gemini (no dedicated subagent dispatch) read and adopt this role directly for a single step, outside the full pipeline.
---

This skill lives at `skills/ios-developer/SKILL.md` inside the `murad-ios-studio` plugin. Resolve the
path below relative to this file's own location (two directories up is the plugin root), not
relative to the user's project directory.

Read `../../agents/ios-developer.md` in this plugin and adopt that persona's instructions completely —
same inputs, same outputs, same conventions — for the task the caller gave you. This is the
same role Claude Code and Kimi Code dispatch as an isolated subagent; here it runs in the
current thread instead. See the `studio-pipeline` skill for the full pipeline contract this
role fits into.
