# Murad iOS Studio (`murad-ios-studio`)

Repo: https://github.com/rxalimurad-art/murad-ios-studio

A **studio of specialist agents** taking an iOS app from a one-line idea to the App Store. You
give the idea and approve two gates — the studio handles the hundred steps in between. Works as
a native plugin in Claude Code, Kimi Code, Codex CLI, and Gemini CLI.

```
idea → research → PRD → design → architecture → build → review/QA → TestFlight → App Store
            ▲ GATE 1: scope-lock (you approve the plan) ▲        ▲ GATE 2: ship (you confirm) ▲
```

## Prerequisites

- macOS 14.5+, Xcode 16+, Node.js 18+ (for MobileBuildMCP, installed automatically via `npx`)
- Optional, for the deploy stage: `brew install fastlane`
- An Apple Developer account (paid) for TestFlight/App Store submission

## Install

From the GitHub repo (Claude Code 2.1.275+, one step):

```
/plugin install murad-ios-studio --marketplace rxalimurad-art/murad-ios-studio
```

On older versions, add the marketplace first:

```
/plugin marketplace add rxalimurad-art/murad-ios-studio
/plugin install murad-ios-studio@murad-studio
```

Or from a local clone of this directory:

```
/plugin marketplace add /Users/alimurad/Documents/GitHub/murad-ios-studio
/plugin install murad-ios-studio@murad-studio
```

> Note: installing from the GitHub repo requires it to be **public** (the plugin manager clones
> without auth). While it's private, use the local-path install above.

The plugin ships the `mobilebuildmcp` MCP server; approve it when Claude Code prompts on first
use, and check it with `/mcp`.

### Kimi Code

The repo keeps both manifests — `.claude-plugin/plugin.json` for Claude Code and
`kimi.plugin.json` for Kimi Code — and the agent/skill frontmatter carries both spellings
(`when_to_use` + `whenToUse`, `WebFetch` + `FetchURL`), so the same checkout installs in either:

```
/plugins install https://github.com/rxalimurad-art/murad-ios-studio
/reload
```

### Codex CLI

This repo is also a valid Codex plugin (`.codex-plugin/plugin.json`). Codex has no slash
commands or named subagents, so every command and agent is exposed as a skill instead
(`$app-run`, `$app-init`, `$ios-developer`, etc. — see [Running on Codex/Gemini](#running-on-codexgemini-vs-claude-codekimi-code) below).

```
codex plugin marketplace add /Users/alimurad/Documents/GitHub/murad-ios-studio
codex plugin add murad-ios-studio
```

(swap the local path for `rxalimurad-art/murad-ios-studio` to install straight from GitHub).

### Gemini CLI

This repo is also a valid Gemini CLI extension (`gemini-extension.json`), with the same six
pipeline stages (plus `app-dashboard`) exposed both as skills and as `/`-style TOML commands under `commands/*.toml`
(`/app-run`, `/app-init`, …).

```
gemini extensions install https://github.com/rxalimurad-art/murad-ios-studio
```

## Running on Codex/Gemini vs. Claude Code/Kimi Code

Claude Code and Kimi Code dispatch each specialist as an isolated subagent. Codex CLI and
Gemini CLI have no equivalent for custom named subagents, so there the same 8 roles and 6
pipeline stages are exposed as **skills** (`skills/app-researcher`, `skills/app-init`, …) that
each do one thing: read the canonical instructions in `agents/*.md` or `commands/*.md` and
follow them in the current thread instead of a separate context. The pipeline contract itself
(stages, the two gates, the board format, verify-before-done) is identical on every runtime —
see the `studio-pipeline` skill. Gemini additionally gets `commands/*.toml` wrappers so the six
stages also show up as native `/`-commands there.

`agents/`, `commands/`, and `skills/` are the source of truth; the bridge skills under `skills/`
just point at them, so there's one place to edit the actual studio behavior.

## Quickstart

From an **empty project folder**:

```
/murad-ios-studio:app-run A habit tracker for new parents with streaks and reminders
```

Or drive the stages manually:

```
/murad-ios-studio:app-init <idea>     # research → vision → PRD → design → architecture docs
/murad-ios-studio:app-plan            # PRD/backlog → sprint board (docs/30-board.md)
/murad-ios-studio:app-build           # loop: developers → reviewer → QA until board is done
/murad-ios-studio:app-status          # standup: board state, blockers, next steps
/murad-ios-studio:app-ship [version]  # release assets → TestFlight → (gate) → App Store
/murad-ios-studio:app-dashboard [port] # live web dashboard of the project (default :4777)
```

## Dashboard

`/murad-ios-studio:app-dashboard` starts a small local server (`dashboard/server.mjs`, Node only,
no dependencies) and gives you `http://localhost:4777`. Keep it open while the pipeline runs: it
re-reads your project's `docs/` every few seconds and shows

- the 8 stages and both gates, with what's done, active, or waiting on you
- the ticket board from `docs/30-board.md` as columns by status, with each ticket's evidence
- open bugs from `docs/51-bugs.md` (blockers first) and every blocker agents flagged for you
- every doc, rendered in a viewer

- run metrics from `docs/90-telemetry.jsonl`: time per stage, cycle time per ticket, first-pass
  review rate, rework loops, build/test pass rates, and a live activity feed

**Telemetry is local only.** Agents append one JSON line per event (stage start/end, gate
decisions, ticket moves, build/test results, review and QA verdicts) to `docs/90-telemetry.jsonl`
in your project; the format is in the `studio-pipeline` skill. Nothing is sent anywhere. When the
log has gate decisions, the dashboard uses them instead of guessing gate state from which docs
exist.

It's read-only — it never writes to `docs/`. You can also run it directly from a project folder:
`node <plugin-root>/dashboard/server.mjs . --port 4777`.

## The team

Dispatched as a subagent on Claude Code/Kimi Code, run in-thread as a skill on Codex/Gemini CLI.

| Agent | Role |
| --- | --- |
| `app-researcher` | Validates the idea: competitors, App Store category, positioning |
| `product-manager` | PRD, user stories, MVP scope |
| `ux-designer` | Flows, screen inventory, design tokens, SwiftUI-ready specs |
| `ios-architect` | Stack, SPM modules, ADRs, git/CI strategy |
| `ios-developer` | Implements features; builds/tests on the simulator via MobileBuildMCP |
| `code-reviewer` | The merge gate — concurrency, accessibility, security, data-path defects |
| `qa-engineer` | Test plans, XCUITest, bug filing, ship sign-off |
| `release-manager` | fastlane, signing, screenshots, metadata, TestFlight, submission |

## How it stays honest

- **Docs are the source of truth.** Everything lands in `docs/` in your project
  (`00-vision`, `01-research`, `10-prd`, `12-design`, `20-architecture`, `30-board`,
  `50-test-plan`, `51-bugs`, `60-release`). Every agent reads them before acting.
- **Nothing is "done" on an agent's say-so.** A ticket moves to review only after the
  build compiles and tests exit zero on a real simulator run.
- **Ambiguity stops the line.** Agents write blockers into the board/standup and ask you
  instead of guessing.

## Roadmap (not in v1)

Brownfield onboarding/audit for existing apps, parallel worktree isolation for developers,
Android/backend roles, control-room dashboard. Design concepts adapted from
[vmobifystudio/app-dev-team](https://github.com/vmobifystudio/app-dev-team) (MIT) — see
`THIRD_PARTY_NOTICES.md`.
