#!/usr/bin/env node
// Оркестратор стенда: збирає варіанти (worktree або поточний робочий
// каталог), піднімає gzip-сервери одночасно, ганяє lighthouse round-robin
// (2 прогони на варіант за замовчуванням — увімкни --rounds=5 для
// фінального заміру; ніколи не паралельно), друкує таблицю медіан і
// діагностику останнього прогону.
//
// Використання:
//   node scripts/perf/run.mjs <config.mjs> [--rounds=2] [--keep] [--workdir=/tmp/x]
//
// Формат config.mjs — default export: масив варіантів
//   { label, worktree: '<git ref>' }                 — ізольований worktree
//   { label, local: true }                            — поточний робочий каталог як є
//   { label, local: true, distTransform: async (distDir) => {} } — build з поточного
//     каталогу, потім мутація копії dist (напр. вирізати GTM/Pixel)
//
// Усі тимчасові артефакти (worktrees, dist-копії, json-звіти lighthouse)
// лягають у --workdir (за замовчуванням os.tmpdir()/autoins-perf-<ts>) —
// поза репозиторієм, git status лишається чистим.
import path from 'path';
import fs from 'fs';
import os from 'os';
import { pathToFileURL } from 'url';

import { startStaticServer } from './lib/gzip-server.mjs';
import { addWorktree, removeWorktree, REPO_ROOT } from './lib/worktree.mjs';
import { buildVariant, copyDist } from './lib/build.mjs';
import { runLighthouse } from './lib/lighthouse.mjs';
import { extractMetrics, median, formatTable } from './lib/metrics.mjs';
import { buildDiagnostics, formatDiagnostics } from './lib/diagnostics.mjs';

function parseArgs(argv) {
  const configPath = argv.find((a) => !a.startsWith('--'));
  const opts = { rounds: 2, keep: false, workdir: null };
  for (const a of argv) {
    if (a.startsWith('--rounds=')) opts.rounds = Number(a.split('=')[1]);
    if (a === '--keep') opts.keep = true;
    if (a.startsWith('--workdir=')) opts.workdir = a.split('=')[1];
  }
  if (!configPath) {
    console.error(
      'Використання: node scripts/perf/run.mjs <config.mjs> [--rounds=2] [--keep] [--workdir=path]'
    );
    process.exit(1);
  }
  return { configPath: path.resolve(configPath), ...opts };
}

async function prepareVariant(variant, workDir, port) {
  let cwd;
  if (variant.worktree) {
    cwd = addWorktree(variant.worktree, path.join(workDir, 'wt', variant.label));
  } else if (variant.local) {
    cwd = REPO_ROOT;
  } else {
    throw new Error(`Варіант "${variant.label}" не має ні worktree, ні local`);
  }

  const dist = buildVariant(cwd, { logLabel: variant.label });
  const serveDir = path.join(workDir, 'dist', variant.label);
  copyDist(dist, serveDir);

  if (variant.distTransform) {
    await variant.distTransform(serveDir);
  }

  const server = await startStaticServer(serveDir, port);
  return { ...variant, cwd, serveDir, server, port };
}

async function main() {
  const { configPath, rounds, keep, workdir } = parseArgs(process.argv.slice(2));
  const config = (await import(pathToFileURL(configPath).href)).default;

  const workDir = workdir || path.join(os.tmpdir(), `autoins-perf-${Date.now()}`);
  fs.mkdirSync(workDir, { recursive: true });
  console.log(`[run] робоча тека: ${workDir}`);

  const prepared = [];
  try {
    let port = 5301;
    for (const variant of config) {
      console.log(`\n[run] готую варіант: ${variant.label}`);
      prepared.push(await prepareVariant(variant, workDir, port));
      port += 1;
    }

    console.log('\n[run] сервери підняті одночасно:');
    prepared.forEach((v) => console.log(`  ${v.label} -> ${v.server.url}`));

    const resultsDir = path.join(workDir, 'lighthouse');
    fs.mkdirSync(resultsDir, { recursive: true });

    const scoresByLabel = Object.fromEntries(prepared.map((v) => [v.label, []]));
    const lastLhrByLabel = {};

    console.log(`\n[run] lighthouse round-robin, ${rounds} прогонів/варіант, послідовно...`);
    for (let round = 1; round <= rounds; round += 1) {
      for (const v of prepared) {
        const outPath = path.join(resultsDir, `${v.label}-r${round}.json`);
        console.log(`  [round ${round}] ${v.label} ...`);
        const lhr = await runLighthouse(v.server.url, outPath);
        const m = extractMetrics(lhr);
        scoresByLabel[v.label].push(m);
        lastLhrByLabel[v.label] = lhr;
        console.log(
          `    score=${m.score} fcp=${Math.round(m.fcp)} lcp=${Math.round(m.lcp)} tbt=${Math.round(m.tbt)} si=${Math.round(m.si)} cls=${m.cls}`
        );
      }
    }

    const rows = prepared.map((v) => {
      const runs = scoresByLabel[v.label];
      return {
        label: v.label,
        scores: runs.map((r) => r.score),
        fcp: median(runs.map((r) => r.fcp)),
        lcp: median(runs.map((r) => r.lcp)),
        tbt: median(runs.map((r) => r.tbt)),
        si: median(runs.map((r) => r.si)),
        cls: median(runs.map((r) => r.cls)),
      };
    });

    console.log('\n' + formatTable(rows));

    for (const v of prepared) {
      const diag = buildDiagnostics(lastLhrByLabel[v.label]);
      console.log(formatDiagnostics(v.label, diag));
    }

    console.log(`\n[run] повні json-звіти: ${resultsDir}`);
  } finally {
    for (const v of prepared) {
      await v.server.close();
    }
    if (!keep) {
      for (const variant of config) {
        if (variant.worktree) {
          removeWorktree(path.join(workDir, 'wt', variant.label));
        }
      }
    } else {
      console.log(`[run] --keep: worktree/dist лишені в ${workDir}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
