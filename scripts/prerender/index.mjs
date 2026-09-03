#!/usr/bin/env node
// Постбілд-прередер (варіант O2 з .claude/performance/plan-v2.md): рендерить
// HeroTabs + HeroPicture через react-dom/server, витягує критичний
// Emotion-CSS і вставляє все в dist/index.html усередині <div id="__ssg">,
// щоб перший екран головної був у HTML ще до виконання React-бандла.
//
// Запускається як npm postbuild, тобто ПІСЛЯ `vite build` — dist/ уже
// існує з фінальними хешованими іменами файлів.
import fs from 'fs';
import path from 'path';
import { buildShellModule } from './build-shell.mjs';

const HERE = path.dirname(new URL(import.meta.url).pathname);
const REPO_ROOT = path.resolve(HERE, '..', '..');
const DIST_DIR = path.join(REPO_ROOT, 'dist');
const INDEX_HTML = path.join(DIST_DIR, 'index.html');

function assertAssetsExist(html, distDir) {
  const found = new Set(html.match(/\/assets\/[^"'\s)]+/g) || []);
  const missing = [...found].filter(
    (assetPath) => !fs.existsSync(path.join(distDir, assetPath.replace(/^\//, '')))
  );
  if (missing.length) {
    throw new Error(
      `[prerender] прередерена розмітка посилається на файли, яких немає в dist/:\n` +
        missing.map((m) => `  ${m}`).join('\n') +
        `\nНайімовірніша причина — SSR-білд героя хешував assets інакше, ніж основний ` +
        `клієнтський білд (перевір, що build-shell.mjs справді використовує vite.config.js проєкту).`
    );
  }
  return found;
}

// Друга, незалежна перевірка тих самих імен: не просто "файл існує на
// диску", а "це справді той самий файл, який щойно емітив клієнтський
// білд" — звіряємось із мапою name -> fileName з vite.config.js
// (emitAssetMap), а не тільки з fs.existsSync.
function assertAssetsMatchClientBundle(assetPaths, distDir) {
  const mapPath = path.join(distDir, '.asset-map.json');
  if (!fs.existsSync(mapPath)) {
    throw new Error('[prerender] dist/.asset-map.json відсутній — emitAssetMap у vite.config.js не спрацював');
  }
  const map = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
  const knownFileNames = new Set(Object.values(map));
  const unknown = [...assetPaths].filter(
    (assetPath) => !knownFileNames.has(assetPath.replace(/^\//, ''))
  );
  if (unknown.length) {
    throw new Error(
      `[prerender] прередер посилається на файли поза мапою клієнтського бандла (name -> fileName):\n` +
        unknown.map((m) => `  ${m}`).join('\n')
    );
  }
}

function injectIntoRoot(indexHtml, shellHtml) {
  const rootRe = /(<div id="root"[^>]*>)(\s*)(<\/div>)/;
  if (!rootRe.test(indexHtml)) {
    throw new Error('[prerender] не знайдено порожній <div id="root">...</div> у dist/index.html');
  }
  return indexHtml.replace(
    rootRe,
    (_m, open, _ws, close) => `${open}<div id="__ssg">${shellHtml}</div>${close}`
  );
}

function injectCss(indexHtml, css) {
  if (!indexHtml.includes('</head>')) {
    throw new Error('[prerender] не знайдено </head> у dist/index.html');
  }
  return indexHtml.replace('</head>', `${css}\n</head>`);
}

function cleanupStaleTmpDirs() {
  for (const name of fs.readdirSync(REPO_ROOT)) {
    if (name.startsWith('.tmp-prerender-')) {
      fs.rmSync(path.join(REPO_ROOT, name), { recursive: true, force: true });
    }
  }
}

async function main() {
  cleanupStaleTmpDirs();

  if (!fs.existsSync(INDEX_HTML)) {
    throw new Error(`[prerender] dist/index.html не знайдено (${INDEX_HTML}) — спершу vite build`);
  }

  console.log('[prerender] SSR-білд entry.jsx (HeroTabs + HeroPicture) ...');
  const { outDir, entryPath } = await buildShellModule();

  let html;
  let css;
  try {
    const mod = await import(`file://${entryPath}?t=${Date.now()}`);
    ({ html, css } = mod.renderShell());
  } finally {
    fs.rmSync(outDir, { recursive: true, force: true });
  }

  if (!html || !html.includes('<section')) {
    throw new Error('[prerender] renderShell() повернув порожню/підозрілу розмітку');
  }

  const assetPaths = assertAssetsExist(html, DIST_DIR);
  assertAssetsMatchClientBundle(assetPaths, DIST_DIR);

  let indexHtml = fs.readFileSync(INDEX_HTML, 'utf8');
  indexHtml = injectCss(indexHtml, css);
  indexHtml = injectIntoRoot(indexHtml, html);
  fs.writeFileSync(INDEX_HTML, indexHtml);

  // Внутрішній артефакт клієнтського білда — не для продакшн-бандла.
  const assetMapPath = path.join(DIST_DIR, '.asset-map.json');
  if (fs.existsSync(assetMapPath)) fs.rmSync(assetMapPath);

  console.log(`[prerender] готово: статичний перший екран вкладено в dist/index.html (${html.length} байт розмітки, ${css.length} байт CSS)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
