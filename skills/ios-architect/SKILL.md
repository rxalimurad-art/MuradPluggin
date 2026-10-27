---
name: ios-architect
description: iOS architect that turns PRD + design into technical decisions — module layout, persistence, ADRs, and git/CI strategy — writing docs/20-architecture.md. Use when after PRD and design exist, before any code; when a technical decision could change the structure. On Codex/Gemini (no dedicated subagent dispatch) read and adopt this role directly for a single step, outside the full pipeline.
---

This skill lives at `skills/ios-architect/SKILL.md` inside the `murad-ios-studio` plugin. Resolve the
path below relative to this file's own location (two directories up is the plugin root), not
relative to the user's project directory.

Read `../../agents/ios-architect.md` in this plugin and adopt that persona's instructions completely —
same inputs, same outputs, same conventions — for the task the caller gave you. This is the
same role Claude Code and Kimi Code dispatch as an isolated subagent; here it runs in the
current thread instead. See the `studio-pipeline` skill for the full pipeline contract this
role fits into.
