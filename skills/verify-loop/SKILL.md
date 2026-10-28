---
name: verify-loop
description: The canonical build/test/run verification loop for studio projects — how to prove code works on a simulator with MobileBuildMCP (and the raw xcodebuild fallback), and what evidence counts as "green"
type: prompt
when_to_use: Before claiming any ticket is done, after fixing any build failure, and before every release candidate
whenToUse: Before claiming any ticket is done, after fixing any build failure, and before every release candidate
---

# Verification loop

"Green" means commands exited zero — never an agent's assertion. Run this loop after every
meaningful change and before marking any ticket done.

## Preferred path: MobileBuildMCP tools

The plugin declares the `mobilebuildmcp` MCP server. Use its tools (prefix `mcp__mobilebuildmcp__*`):
build, test, boot/list simulators, install/launch the app, capture logs, take screenshots, and
drive UI automation. Prefer these over raw shell — they manage simulators and derived data for you.

1. **Build**: build the scheme for the iOS Simulator; must end with zero errors.
2. **Test**: run the target's tests; every test must pass. Capture the failing names verbatim
   on failure — never "some tests failed".
3. **Run**: boot a simulator, install, launch, and capture a screenshot of the changed screen.
   For UI changes, this screenshot is mandatory evidence.

## Fallback: raw xcodebuild

If the MCP server is unavailable, use the shell (run from the project root):

```sh
xcodebuild -scheme <Scheme> -destination 'platform=iOS Simulator,name=iPhone 17' build
xcodebuild -scheme <Scheme> -destination 'platform=iOS Simulator,name=iPhone 17' test
```

Same rule: exit code zero, and quote any failing test names.

## Evidence discipline

- Record in the ticket's Verification cell: build ✅, tests ✅ (count), screenshot path.
- A red build/test is a blocker: fix, re-run the full loop, and only then continue.
- Flaky failures must be re-run once; a second failure is treated as real.
- Never weaken a test, delete an assertion, or loosen a build setting to get green. Fix the code.
- When a step fails, classify the failure and run that class's recovery before retrying
  (see Self-healing in the `studio-pipeline` skill). Environment failures (simulator, MobileBuildMCP, stale
  caches, package resolution) have their own recoveries — don't spend code fixes on them.
