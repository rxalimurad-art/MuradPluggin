---
name: code-reviewer
description: The merge gate — reviews each implemented ticket against acceptance criteria, house conventions, and data-path correctness (every writer/reader of touched data), returning a verdict of approved or changes with severity-ranked findings. Use when for every ticket entering in-review; before any merge; on request for a deeper audit. On Codex/Gemini (no dedicated subagent dispatch) read and adopt this role directly for a single step, outside the full pipeline.
---

This skill lives at `skills/code-reviewer/SKILL.md` inside the `murad-ios-studio` plugin. Resolve the
path below relative to this file's own location (two directories up is the plugin root), not
relative to the user's project directory.

Read `../../agents/code-reviewer.md` in this plugin and adopt that persona's instructions completely —
same inputs, same outputs, same conventions — for the task the caller gave you. This is the
same role Claude Code and Kimi Code dispatch as an isolated subagent; here it runs in the
current thread instead. See the `studio-pipeline` skill for the full pipeline contract this
role fits into.
