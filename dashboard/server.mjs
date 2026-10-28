#!/usr/bin/env node
// Studio dashboard: a zero-dependency local server that reads a studio project's docs/ folder
// and serves a read-only visual standup. Usage: node server.mjs [projectDir] [--port N]

import { createServer } from 'node:http';
import { readFile, readdir, stat } from 'node:fs/promises';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const portFlag = args.indexOf('--port');
const port = portFlag >= 0 ? Number(args[portFlag + 1]) : Number(process.env.STUDIO_DASHBOARD_PORT || 4777);
const projectDir = resolve(args.find((a, i) => !a.startsWith('--') && args[i - 1] !== '--port') || process.cwd());
const docsDir = join(projectDir, 'docs');

// Mirrors the stage table in skills/studio-pipeline/SKILL.md.
const STAGES = [
  { id: 1, name: 'Research', owner: 'app-researcher', docs: ['01-research.md'] },
  { id: 2, name: 'Vision', owner: 'main agent', docs: ['00-vision.md'] },
  { id: 3, name: 'PRD', owner: 'product-manager', docs: ['10-prd.md', '11-backlog.md'] },
  { id: 4, name: 'Design', owner: 'ux-designer', docs: ['12-design.md'] },
  { id: 5, name: 'Architecture', owner: 'ios-architect', docs: ['20-architecture.md'] },
  { id: 6, name: 'Board', owner: 'main agent', docs: ['30-board.md'] },
  { id: 7, name: 'Build', owner: 'developer → reviewer → QA', docs: [] },
  { id: 8, name: 'Release', owner: 'release-manager', docs: ['60-release.md'] },
];
const STATUSES = ['blocked', 'ready', 'in-progress', 'in-review', 'qa', 'done'];

async function readDoc(name) {
  try { return await readFile(join(docsDir, name), 'utf8'); } catch { return null; }
}

// Returns every Markdown table in the text as arrays of row objects keyed by lowercased header.
function parseTables(md) {
  const tables = [];
  const lines = md.split('\n');
  for (let i = 0; i < lines.length - 1; i++) {
    if (!/^\s*\|/.test(lines[i]) || !/^\s*\|?\s*:?-{3,}/.test(lines[i + 1])) continue;
    const cells = (l) => l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
    const headers = cells(lines[i]).map((h) => h.toLowerCase());
    const rows = [];
    let j = i + 2;
    for (; j < lines.length && /^\s*\|/.test(lines[j]); j++) {
      const c = cells(lines[j]);
      rows.push(Object.fromEntries(headers.map((h, k) => [h, (c[k] ?? '').replace(/`/g, '')])));
    }
    tables.push({ headers, rows });
    i = j - 1;
  }
  return tables;
}

function parseBoard(md) {
  if (!md) return null;
  const table = parseTables(md).find((t) => t.headers.includes('id') && t.headers.includes('status'));
  if (!table) return { tickets: [], counts: {} };
  const tickets = table.rows
    .filter((r) => r.id && !/^-+$/.test(r.id))
    .map((r) => ({
      id: r.id,
      title: r.title || '',
      owner: r.owner || '',
      dependsOn: r['depends on'] || '',
      status: (r.status || '').toLowerCase().replace(/\s+/g, '-'),
      verification: r.verification || '',
    }));
  const counts = Object.fromEntries(STATUSES.map((s) => [s, tickets.filter((t) => t.status === s).length]));
  return { tickets, counts };
}

// Bugs may be a table (with a severity/status column) or "## BUG-…" sections; handle both.
function parseBugs(md) {
  if (!md) return null;
  const table = parseTables(md).find((t) => t.headers.includes('severity'));
  if (table) {
    return table.rows.map((r) => ({
      id: r.id || r.bug || '',
      title: r.title || r.summary || '',
      severity: (r.severity || '').toLowerCase(),
      status: (r.status || 'open').toLowerCase(),
    }));
  }
  const bugs = [];
  for (const section of md.split(/^#{2,3}\s+/m).slice(1)) {
    const [heading, ...body] = section.split('\n');
    const text = body.join('\n');
    const sev = /severity\W+(blocker|major|minor)/i.exec(text);
    const status = /status\W+(\w[\w-]*)/i.exec(text);
    const m = /^([A-Z]+-\d+)\s*[:—–-]?\s*(.*)$/.exec(heading.trim());
    bugs.push({
      id: m ? m[1] : '',
      title: m ? m[2] : heading.trim(),
      severity: sev ? sev[1].toLowerCase() : '',
      status: status ? status[1].toLowerCase() : 'open',
    });
  }
  return bugs;
}

// Lines that agents flag for the user: "Blocker:", "BLOCKED", "Question for user", etc.
function findBlockers(docs) {
  const out = [];
  for (const [name, md] of Object.entries(docs)) {
    if (!md) continue;
    const flag = /\b(blocker|blocked|needs user|question for (the )?user)\b/i;
    for (const line of md.split('\n')) {
      if (!flag.test(line) || /^\s*\|?\s*:?-{3}/.test(line) || /^\s*\|\s*ID\s*\|/i.test(line) || /^Status values/i.test(line)) continue;
      if (/^\s*\|/.test(line)) {
        // Table row: report as "<first cell>: <cells that carry the flag>", skipping bare status cells.
        const cells = line.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim().replace(/`/g, ''));
        const hits = cells.slice(1).filter((c) => flag.test(c) && !/^(blocked|blocker)$/i.test(c));
        if (hits.length) out.push({ doc: name, text: `${cells[0]}: ${hits.join(' · ')}` });
        continue;
      }
      out.push({ doc: name, text: line.trim().replace(/^[-*]\s*/, '') });
    }
  }
  return out.slice(0, 40);
}

function vision(md) {
  if (!md) return null;
  const title = (/^#\s+(.+)$/m.exec(md) || [])[1] || 'Untitled';
  const wedge = (/##[^\n]*wedge[^\n]*\n+([\s\S]*?)(\n##|$)/i.exec(md) || [])[1];
  const success = (/##[^\n]*success[^\n]*\n+([\s\S]*?)(\n##|$)/i.exec(md) || [])[1];
  return { title: title.replace(/^Vision:\s*/i, ''), wedge: wedge?.trim() || '', success: success?.trim() || '' };
}

async function state() {
  let files = [];
  try { files = (await readdir(docsDir)).filter((f) => f.endsWith('.md')).sort(); } catch {}
  const docs = Object.fromEntries(await Promise.all(files.map(async (f) => [f, await readDoc(f)])));
  const mtimes = Object.fromEntries(await Promise.all(files.map(async (f) => [f, (await stat(join(docsDir, f))).mtimeMs])));
  const board = parseBoard(docs['30-board.md']);
  const bugs = parseBugs(docs['51-bugs.md']);
  const release = docs['60-release.md'] || '';

  const stages = STAGES.map((s) => {
    let status = s.docs.length && s.docs.every((d) => docs[d]) ? 'done' : s.docs.some((d) => docs[d]) ? 'active' : 'todo';
    if (s.id === 7 && board) {
      const total = board.tickets.length;
      status = total && board.counts.done === total ? 'done' : total ? 'active' : 'todo';
    }
    if (s.id === 8 && docs['60-release.md']) status = /submitted|uploaded|in review|testflight build/i.test(release) ? 'done' : 'active';
    return { ...s, status };
  });
  // GATE 1 is approved once a board exists (the board is only written after scope-lock).
  const gate1 = stages[4].status === 'done' ? (docs['30-board.md'] ? 'approved' : 'waiting') : 'pending';
  const gate2 = stages[7].status === 'done' ? 'approved' : stages[7].status === 'active' ? 'waiting' : 'pending';

  return {
    project: projectDir,
    hasDocs: files.length > 0,
    vision: vision(docs['00-vision.md']),
    stages,
    gates: { scopeLock: gate1, ship: gate2 },
    board,
    bugs,
    blockers: findBlockers(docs),
    docs: files.map((f) => ({ name: f, mtime: mtimes[f] })),
    updated: Math.max(0, ...Object.values(mtimes)),
  };
}

const send = (res, code, type, body) => {
  res.writeHead(code, { 'content-type': type, 'cache-control': 'no-store' });
  res.end(body);
};

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  try {
    if (url.pathname === '/') return send(res, 200, 'text/html; charset=utf-8', await readFile(join(here, 'index.html')));
    if (url.pathname === '/api/state') return send(res, 200, 'application/json', JSON.stringify(await state()));
    if (url.pathname === '/api/doc') {
      const name = url.searchParams.get('name') || '';
      if (!/^[\w.-]+\.md$/.test(name)) return send(res, 400, 'text/plain', 'bad name');
      const md = await readDoc(name);
      return md == null ? send(res, 404, 'text/plain', 'not found') : send(res, 200, 'text/plain; charset=utf-8', md);
    }
    send(res, 404, 'text/plain', 'not found');
  } catch (e) {
    send(res, 500, 'text/plain', String(e));
  }
}).listen(port, '127.0.0.1', () => {
  console.log(`Murad iOS Studio dashboard: http://localhost:${port}  (project: ${projectDir})`);
});
