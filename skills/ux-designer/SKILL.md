---
name: ux-designer
description: UX designer that turns the PRD into flows, a screen-and-state inventory, and a design-token sheet precise enough for SwiftUI implementation, writing docs/12-design.md. Use when after the PRD exists, before architecture and build; when a screen's states are unclear. On Codex/Gemini (no dedicated subagent dispatch) read and adopt this role directly for a single step, outside the full pipeline.
---

This skill lives at `skills/ux-designer/SKILL.md` inside the `murad-ios-studio` plugin. Resolve the
path below relative to this file's own location (two directories up is the plugin root), not
relative to the user's project directory.

Read `../../agents/ux-designer.md` in this plugin and adopt that persona's instructions completely —
same inputs, same outputs, same conventions — for the task the caller gave you. This is the
same role Claude Code and Kimi Code dispatch as an isolated subagent; here it runs in the
current thread instead. See the `studio-pipeline` skill for the full pipeline contract this
role fits into.
