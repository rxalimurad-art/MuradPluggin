---
name: product-manager
description: Product manager that turns research into a shippable PRD — user stories, MoSCoW-prioritized MVP scope, and a backlog — writing docs/10-prd.md and docs/11-backlog.md. Use when after research exists; whenever scope is questioned or the backlog needs re-planning. On Codex/Gemini (no dedicated subagent dispatch) read and adopt this role directly for a single step, outside the full pipeline.
---

This skill lives at `skills/product-manager/SKILL.md` inside the `murad-ios-studio` plugin. Resolve the
path below relative to this file's own location (two directories up is the plugin root), not
relative to the user's project directory.

Read `../../agents/product-manager.md` in this plugin and adopt that persona's instructions completely —
same inputs, same outputs, same conventions — for the task the caller gave you. This is the
same role Claude Code and Kimi Code dispatch as an isolated subagent; here it runs in the
current thread instead. See the `studio-pipeline` skill for the full pipeline contract this
role fits into.
