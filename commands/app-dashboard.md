---
description: Dashboard — opens a live local web page showing the project's pipeline stage, gates, ticket board, open bugs, blockers, and docs
argument-hint: [port]
---

Start the studio dashboard for the current project — read-only, no new pipeline work.

1. Locate `dashboard/server.mjs` in this plugin's own root (on Claude Code: `${CLAUDE_PLUGIN_ROOT}`;
   otherwise two directories up from this command file), not in the user's project.
2. Run it in the background from the user's project directory, so it reads that project's
   `docs/` folder:
   `node <plugin-root>/dashboard/server.mjs "$PWD" --port <port>` — use $ARGUMENTS as the port if
   given, otherwise 4777. If the port is already in use, try the next one.
3. Confirm it answers (`curl -s localhost:<port>/api/state`), then give the user the URL
   `http://localhost:<port>` (open it in a browser pane if this runtime has one).

The page refreshes itself every few seconds as agents update the docs, so it can stay open for
the whole pipeline run. If the project has no `docs/` yet, the page says so and points to
`/murad-ios-studio:app-run`.
