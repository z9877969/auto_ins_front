// Витягання чисел з lighthouse JSON-звіту.

export function extractMetrics(lhr) {
  const a = lhr.audits;
  return {
    score: Math.round((lhr.categories.performance.score ?? 0) * 100),
    fcp: a['first-contentful-paint']?.numericValue ?? null,
    lcp: a['largest-contentful-paint']?.numericValue ?? null,
    tbt: a['total-blocking-time']?.numericValue ?? null,
    si: a['speed-index']?.numericValue ?? null,
    cls: a['cumulative-layout-shift']?.numericValue ?? null,
  };
}

export function median(nums) {
  const sorted = [...nums].sort((x, y) => x - y);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

const round = (n) => (n === null || n === undefined ? '—' : Math.round(n));

export function formatTable(rows) {
  // rows: [{ label, scores: number[], fcp, lcp, tbt, si, cls }] (fcp..cls — медіани)
  const header = [
    'Варіант',
    'Усі бали',
    'Медіана',
    'FCP',
    'LCP',
    'TBT',
    'SI',
    'CLS',
  ];
  const lines = rows.map((r) => [
    r.label,
    r.scores.join('/'),
    String(median(r.scores)),
    String(round(r.fcp)),
    String(round(r.lcp)),
    String(round(r.tbt)),
    String(round(r.si)),
    r.cls === null || r.cls === undefined ? '—' : r.cls.toFixed(3),
  ]);

  const widths = header.map((h, i) =>
    Math.max(h.length, ...lines.map((l) => l[i].length))
  );
  const fmtRow = (cols) =>
    '| ' + cols.map((c, i) => c.padEnd(widths[i])).join(' | ') + ' |';
  const sep = '| ' + widths.map((w) => '-'.repeat(w)).join(' | ') + ' |';

  return [fmtRow(header), sep, ...lines.map(fmtRow)].join('\n');
}
