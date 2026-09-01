// Порівняння для етапу C (.claude/performance/plan-v2.md, розділ "Як міряти
// результат етапу C"):
//   - база: feat/performance-lcp (worktree) — на момент цієї сесії це той
//     самий комміт, з якого відгалужена поточна гілка, тож "база" — це
//     робоче дерево ДО правок етапу C;
//   - поточна гілка після етапу C (як є, зі сторонніми скриптами);
//   - те саме, але з вирізаними GTM/Meta Pixel з dist/index.html — "стеля"
//     без сторонніх, за планом очікується ~88.
//
// Запуск:
//   node scripts/perf/run.mjs scripts/perf/configs/stage-c.mjs --rounds=5
import fs from 'fs';
import path from 'path';

async function stripThirdParty(distDir) {
  const indexPath = path.join(distDir, 'index.html');
  let html = fs.readFileSync(indexPath, 'utf8');

  html = html.replace(
    /<!-- Meta Pixel Code -->[\s\S]*?<!-- End Meta Pixel Code -->\n?/,
    ''
  );
  html = html.replace(
    /<!-- Google Tag Manager -->[\s\S]*?<!-- End Google Tag Manager -->\n?/,
    ''
  );
  html = html.replace(
    /<!-- Meta Pixel Code \(noscript\) -->[\s\S]*?<!-- End Meta Pixel Code \(noscript\) -->\n?/,
    ''
  );
  html = html.replace(
    /<noscript><iframe src="https:\/\/www\.googletagmanager\.com\/ns\.html[\s\S]*?<\/noscript>\n?/,
    ''
  );

  if (/fbq\(|googletagmanager/.test(html)) {
    throw new Error('[stage-c] stripThirdParty не прибрав усе GTM/Pixel з index.html');
  }

  fs.writeFileSync(indexPath, html);
}

export default [
  { label: 'V0-base-lcp', worktree: 'feat/performance-lcp' },
  { label: 'V-C-current', local: true },
  { label: 'V-C-no-3p', local: true, distTransform: stripThirdParty },
];
