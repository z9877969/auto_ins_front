// Збірка одного варіанта: якщо в cwd немає node_modules — символьне
// посилання на node_modules з основного репозиторію (worktree не тягне
// node_modules, а package-lock.json між гілками нашого плану ідентичний;
// якщо колись розійдеться — build впаде на "module not found" і це буде
// видно одразу, symlink нічого не приховує мовчки).
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { REPO_ROOT } from './worktree.mjs';

export function ensureNodeModules(cwd) {
  const nm = path.join(cwd, 'node_modules');
  if (fs.existsSync(nm)) return;
  fs.symlinkSync(path.join(REPO_ROOT, 'node_modules'), nm, 'dir');
}

/**
 * Запускає `npm run build` у заданому cwd. Повертає шлях до dist/.
 * postbuild-скрипт проєкту сам зʼїдає мережеві помилки (`|| true`), тож
 * білд не впаде через недоступність продового API схеми.
 */
export function buildVariant(cwd, { logLabel = cwd } = {}) {
  ensureNodeModules(cwd);
  console.log(`[build] ${logLabel}: npm run build ...`);
  execFileSync('npm', ['run', 'build'], {
    cwd,
    stdio: 'inherit',
    env: { ...process.env },
  });
  const dist = path.join(cwd, 'dist');
  if (!fs.existsSync(path.join(dist, 'index.html'))) {
    throw new Error(`[build] ${logLabel}: dist/index.html не з'явився після build`);
  }
  return dist;
}

/** Копіює dist у окрему теку — щоб кілька варіантів з одного cwd (напр.
 * "поточна гілка як є" і "поточна гілка без 3p") могли роздаватись
 * одночасно різними серверами без конфлікту. */
export function copyDist(distDir, targetDir) {
  fs.rmSync(targetDir, { recursive: true, force: true });
  fs.mkdirSync(targetDir, { recursive: true });
  fs.cpSync(distDir, targetDir, { recursive: true });
  return targetDir;
}
