// A/B/C по кількості preload-шрифтів (етап C, п.4 плану): 4 (як є) проти 2
// (400 і 800 — ті, що реально на першому екрані) проти 0 (жодного preload,
// шрифти йдуть звичайним запитом з CSS). Дивимось, що краще за медіаною
// LCP/бала.
//
// Запуск:
//   node scripts/perf/run.mjs scripts/perf/configs/stage-c-fonts.mjs --rounds=5
import fs from 'fs';
import path from 'path';

// regular/600/700/800 варіанти інколи розбиті на два рядки (crossorigin на
// наступному) — [\s\S]*? нежадібно ковтає і однорядковий, і дворядковий формат.
const FONT_PRELOAD_RE =
  /[ \t]*<link rel="preload" href="[^"]*open-sans-v36-cyrillic_latin-(regular|\d+)-[^"]*\.woff2" as="font" type="font\/woff2"[\s\S]*?crossorigin\s*\/>\n?/g;

function removeFontPreloads(distDir, keepWeights) {
  const indexPath = path.join(distDir, 'index.html');
  let html = fs.readFileSync(indexPath, 'utf8');

  let removed = 0;
  html = html.replace(FONT_PRELOAD_RE, (match, weightTag) => {
    if (keepWeights.includes(weightTag)) return match;
    removed += 1;
    return '';
  });

  const remaining = (html.match(/as="font"/g) || []).length;
  if (remaining !== keepWeights.length) {
    throw new Error(
      `[stage-c-fonts] очікував ${keepWeights.length} font-preload лінків, лишилось ${remaining} (прибрано ${removed})`
    );
  }

  fs.writeFileSync(indexPath, html);
}

export default [
  { label: 'fonts-4-as-is', local: true },
  {
    label: 'fonts-2-400-800',
    local: true,
    distTransform: (dir) => removeFontPreloads(dir, ['regular', '800']),
  },
  {
    label: 'fonts-0',
    local: true,
    distTransform: (dir) => removeFontPreloads(dir, []),
  },
];
