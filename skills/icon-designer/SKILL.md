---
name: icon-designer
description: App icon designer that turns the vision and design tokens into an icon concept and vector masters (light, dark, tinted), renders a validated AppIcon.appiconset, and writes docs/13-icon.md. Use when after the design doc exists, before architecture; whenever the icon needs a redesign or the user supplies their own artwork. On Codex/Gemini (no dedicated subagent dispatch) read and adopt this role directly for a single step, outside the full pipeline.
---

This skill lives at `skills/icon-designer/SKILL.md` inside the `murad-ios-studio` plugin. Resolve the
path below relative to this file's own location (two directories up is the plugin root), not
relative to the user's project directory.

Read `../../agents/icon-designer.md` in this plugin and adopt that persona's instructions completely —
same inputs, same outputs, same conventions — for the task the caller gave you. This is the
same role Claude Code and Kimi Code dispatch as an isolated subagent; here it runs in the
current thread instead. See the `studio-pipeline` skill for the full pipeline contract this
role fits into.
