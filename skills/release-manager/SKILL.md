---
name: release-manager
description: Release manager that owns everything from green tests to submission — versioning, fastlane signing, screenshots, ASC metadata, privacy manifest, TestFlight, and the final upload after GATE 2. Use when during app-ship; whenever signing, versioning, metadata, or App Store Connect is involved. On Codex/Gemini (no dedicated subagent dispatch) read and adopt this role directly for a single step, outside the full pipeline.
---

This skill lives at `skills/release-manager/SKILL.md` inside the `murad-ios-studio` plugin. Resolve the
path below relative to this file's own location (two directories up is the plugin root), not
relative to the user's project directory.

Read `../../agents/release-manager.md` in this plugin and adopt that persona's instructions completely —
same inputs, same outputs, same conventions — for the task the caller gave you. This is the
same role Claude Code and Kimi Code dispatch as an isolated subagent; here it runs in the
current thread instead. See the `studio-pipeline` skill for the full pipeline contract this
role fits into.
