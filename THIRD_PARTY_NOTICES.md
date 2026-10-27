# Third-Party Notices

This plugin's pipeline design and skills adapt ideas from the following MIT-licensed
open-source projects. Original license texts remain with their respective repositories.

## Architectural concepts adapted

- **[vmobifystudio/app-dev-team](https://github.com/vmobifystudio/app-dev-team)** ("AI App Studio") — MIT.
  Source of the stage/gate pipeline model: two human gates (scope-lock and ship), a Markdown
  sprint board as the team's memory, git-verified "done" (a ticket is not done until the build
  and tests prove it), and the rule that agents surface ambiguity instead of guessing.

## Tooling integrated (not vendored)

- **[cameroncooke/XcodeBuildMCP](https://github.com/cameroncooke/XcodeBuildMCP)** (MobileBuildMCP, now maintained by Sentry) — MIT.
  Declared as the plugin's MCP server (`mobilebuildmcp`). Provides build, simulator,
  UI-automation, logging, and debugging tools to the engineering agents.

## Skills adapted

- **[mintuz/skills](https://github.com/mintuz/skills)** (`app` bundle: swiftui-architecture,
  swift-testing, xcode-dev-loop, app-intent-driven-development, asc-screenshots) — MIT
  (see its `THIRD_PARTY_NOTICES.md` for its own attributions).
- **[anasdayeh/build-ios-apps-marketplace](https://github.com/anasdayeh/build-ios-apps-marketplace)**
  (SwiftUI, App Intents, simulator debugging, profiling, and leak-investigation skills) — MIT.

Adaptation note: skill bodies here were rewritten for this pipeline rather than copied
verbatim; the underlying practices (e.g. `@Observable` architecture, Swift Testing patterns,
the canonical build/test/simulator loop) follow those projects.
