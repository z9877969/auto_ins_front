// Діагностичний зріз з останнього прогону варіанта: чому саме такий бал.

function lcpElementDiagnostics(lhr) {
  const el = lhr.audits['largest-contentful-paint-element'];
  if (!el) return null;
  const phasesItem = el.details?.items?.find((i) => i.phases) ?? el.details?.items?.[0];
  const nodeItem = el.details?.items?.find((i) => i.node)?.node;
  const phases = phasesItem?.phases?.map(
    (p) => `${p.label ?? p.id}: ${Math.round(p.timing)} мс (${Math.round((p.percent ?? 0))}%)`
  );
  return {
    element: nodeItem?.snippet || nodeItem?.nodeLabel || '(не визначено)',
    phases: phases || [],
  };
}

function thirdPartySummary(lhr) {
  const audit = lhr.audits['third-party-summary'];
  const items = audit?.details?.items ?? [];
  return items.slice(0, 8).map((i) => ({
    entity: i.entity?.text ?? i.entity ?? '?',
    blockingTime: Math.round(i.blockingTime ?? 0),
    transferSize: Math.round((i.transferSize ?? 0) / 1024),
  }));
}

function bootupTime(lhr) {
  const audit = lhr.audits['bootup-time'];
  const items = audit?.details?.items ?? [];
  return items.slice(0, 8).map((i) => ({
    url: (i.url ?? '').slice(0, 80),
    total: Math.round(i.total ?? 0),
    scripting: Math.round(i.scripting ?? 0),
  }));
}

function mainthreadBreakdown(lhr) {
  const audit = lhr.audits['mainthread-work-breakdown'];
  const items = audit?.details?.items ?? [];
  return items.map((i) => ({
    group: i.groupLabel ?? i.group,
    duration: Math.round(i.duration ?? 0),
  }));
}

function longTasks(lhr) {
  const audit = lhr.audits['long-tasks'];
  const items = audit?.details?.items ?? [];
  return items
    .slice(0, 10)
    .map((i) => ({ url: (i.url ?? '').slice(0, 60), duration: Math.round(i.duration ?? 0) }));
}

function layoutShifts(lhr) {
  const audit = lhr.audits['layout-shifts'];
  const items = audit?.details?.items ?? [];
  return items.slice(0, 10).map((i) => ({
    score: i.score,
    node: i.node?.snippet || i.node?.nodeLabel || '?',
  }));
}

export function buildDiagnostics(lhr) {
  return {
    lcpElement: lcpElementDiagnostics(lhr),
    thirdParty: thirdPartySummary(lhr),
    bootupTime: bootupTime(lhr),
    mainthreadBreakdown: mainthreadBreakdown(lhr),
    longTasks: longTasks(lhr),
    layoutShifts: layoutShifts(lhr),
  };
}

export function formatDiagnostics(label, diag) {
  const lines = [`\n=== ${label}: діагностика останнього прогону ===`];

  if (diag.lcpElement) {
    lines.push(`LCP-елемент: ${diag.lcpElement.element}`);
    diag.lcpElement.phases.forEach((p) => lines.push(`  ${p}`));
  }

  if (diag.thirdParty.length) {
    lines.push('third-party-summary:');
    diag.thirdParty.forEach((t) =>
      lines.push(`  ${t.entity}: blocking ${t.blockingTime} мс, ${t.transferSize} КБ`)
    );
  }

  if (diag.bootupTime.length) {
    lines.push('bootup-time:');
    diag.bootupTime.forEach((b) =>
      lines.push(`  ${b.url}: total ${b.total} мс, scripting ${b.scripting} мс`)
    );
  }

  if (diag.mainthreadBreakdown.length) {
    lines.push('mainthread-work-breakdown:');
    diag.mainthreadBreakdown.forEach((m) => lines.push(`  ${m.group}: ${m.duration} мс`));
  }

  if (diag.longTasks.length) {
    lines.push('long-tasks:');
    diag.longTasks.forEach((t) => lines.push(`  ${t.url || '(inline)'}: ${t.duration} мс`));
  }

  if (diag.layoutShifts.length) {
    lines.push('layout-shifts:');
    diag.layoutShifts.forEach((s) => lines.push(`  score ${s.score}: ${s.node}`));
  }

  return lines.join('\n');
}
