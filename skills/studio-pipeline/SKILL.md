---
name: studio-pipeline
description: The orchestration contract for the Murad iOS Studio pipeline — stages, artifacts, human gates, board format, and the verify-before-done rule that every command and agent follows
type: prompt
when_to_use: At the start of any /murad-ios-studio:* command, and whenever an agent is unsure what stage it is in or what artifact it owns
whenToUse: At the start of any /murad-ios-studio:* command, and whenever an agent is unsure what stage it is in or what artifact it owns
---

# Studio pipeline contract

This is the shared contract every studio command and agent obeys. Follow it exactly; do not
improvise structure.

## Stages and artifacts

Each stage reads the artifacts of the stages before it and writes exactly its own:

| Stage | Owner agent | Reads | Writes |
| --- | --- | --- | --- |
| 1. Research | `app-researcher` | the idea | `docs/01-research.md` |
| 2. Vision | main agent (from research) | `docs/01-research.md` | `docs/00-vision.md` |
| 3. PRD | `product-manager` | `00-vision`, `01-research` | `docs/10-prd.md`, `docs/11-backlog.md` |
| 4. Design | `ux-designer` | `10-prd` | `docs/12-design.md` |
| 5. Architecture | `ios-architect` | `10-prd`, `12-design` | `docs/20-architecture.md` |
| 6. Board | main agent | `11-backlog` | `docs/30-board.md` |
| 7. Build | `ios-developer` → `code-reviewer` → `qa-engineer` | board + all docs | code, `docs/51-bugs.md` |
| 8. Release | `release-manager` | everything | `docs/60-release.md`, store assets |

Docs are plain Markdown in the project's `docs/` folder. They are the team's only shared
memory — if a decision matters, it must be in a doc, not in chat.

## The two human gates

- **GATE 1 — scope-lock.** After stages 1–5 complete, the main agent summarizes vision + PRD +
  architecture + board and asks the user to approve before any code is written. No approval,
  no build loop. Scope changes after this gate go through the user explicitly.
- **GATE 2 — ship.** After `app-ship` reports everything ready (build archived, tests green,
  screenshots captured, metadata complete), the main agent asks the user to confirm before any
  upload to App Store Connect.

## Board format (`docs/30-board.md`)

A Markdown table, one row per ticket:

| ID | Title | Owner | Depends on | Status | Verification |
| --- | --- | --- | --- | --- | --- |
| APP-01 | Onboarding screen | ios-developer | — | ready | build + unit tests |

Status values: `blocked` → `ready` → `in-progress` → `in-review` → `qa` → `done`.
A ticket may only be `ready` when every ticket it depends on is `done`.

## Verify before done

A ticket is `in-review` only when **all** of these hold, and the evidence is recorded in its
Verification cell:

1. The project builds for the simulator with zero errors (via MobileBuildMCP or `xcodebuild`).
2. The tests for the ticket's target pass (exit zero).
3. `git status` shows the ticket's commits on its branch.

An agent's self-report is never sufficient — the commands must have exited zero.

## Ambiguity rule

When a requirement is ambiguous or a dependency is missing, do not guess. Write a blocker
into the board row and the standup, and surface it to the user verbatim in your final
message. A stopped line is cheaper than a wrong build.

## Running this contract on a runtime without subagents

Claude Code and Kimi Code dispatch each stage's owner as an isolated subagent (`agents/*.md`).
Codex CLI and Gemini CLI have no equivalent dispatch primitive for custom named subagents, so
on those runtimes the studio's pipeline stages and roles are exposed as skills instead
(`$app-init`, `$app-researcher`, etc. — see `skills/app-*` and `skills/<role-name>` in this
plugin). When one of those bridge skills calls for a role from the table above:

1. Open that role's file at `agents/<role>.md` in this plugin (resolve the path relative to
   this plugin's own root, not the user's project directory — the bridge skill you're reading
   names the exact relative path to use).
2. Adopt that file's persona and instructions for the step: same inputs, same outputs, same
   "Verify before done" rule above.
3. Do the work in the current thread (there is no isolated subagent context), then continue to
   the pipeline's next stage.

Everything else in this contract — stages, artifacts, the two gates, the board format, and the
verify-before-done rule — applies unchanged regardless of runtime.
