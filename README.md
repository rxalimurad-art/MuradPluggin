# Murad iOS Studio (`murad-ios-studio`)

Repo: https://github.com/rxalimurad-art/murad-ios-studio

A Claude Code plugin that runs a **studio of specialist agents** taking an iOS app from a
one-line idea to the App Store. You give the idea and approve two gates — the studio handles
the hundred steps in between.

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
```

## The team

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
