// Ізоляція git-ревізій через `git worktree` — навмисно НЕ `git stash`
// (стеш уже одного разу ламав робочий каталог у цьому проєкті).
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const REPO_ROOT = execFileSync('git', ['rev-parse', '--show-toplevel'], {
  encoding: 'utf8',
}).trim();

/**
 * Додає worktree для заданого ref у dir. Ідемпотентно: якщо dir уже існує
 * і є зареєстрованим worktree — пропускає.
 */
export function addWorktree(ref, dir) {
  const dirAbs = path.resolve(dir);
  fs.mkdirSync(path.dirname(dirAbs), { recursive: true });

  const existing = execFileSync('git', ['worktree', 'list', '--porcelain'], {
    cwd: REPO_ROOT,
    encoding: 'utf8',
  });
  if (existing.includes(`worktree ${dirAbs}`)) {
    return dirAbs;
  }

  if (fs.existsSync(dirAbs)) {
    fs.rmSync(dirAbs, { recursive: true, force: true });
  }

  execFileSync(
    'git',
    ['worktree', 'add', '--detach', dirAbs, ref],
    { cwd: REPO_ROOT, stdio: 'inherit' }
  );
  return dirAbs;
}

export function removeWorktree(dir) {
  const dirAbs = path.resolve(dir);
  try {
    execFileSync('git', ['worktree', 'remove', '--force', dirAbs], {
      cwd: REPO_ROOT,
      stdio: 'inherit',
    });
  } catch {
    // worktree вже прибраний або каталог не зареєстрований — не критично
    fs.rmSync(dirAbs, { recursive: true, force: true });
    try {
      execFileSync('git', ['worktree', 'prune'], {
        cwd: REPO_ROOT,
        stdio: 'ignore',
      });
    } catch {
      // ignore
    }
  }
}

export { REPO_ROOT };
