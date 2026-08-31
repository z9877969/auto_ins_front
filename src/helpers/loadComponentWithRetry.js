import { lazy } from 'react';

const RELOAD_KEY_PREFIX = 'chunkReload:';
const DEFAULT_RETRIES = 3;
const DEFAULT_INTERVAL = 1000;
const DEFAULT_TIMEOUT = 15000;

const getChunkKey = (importFunc) => {
  const source = importFunc.toString();
  let hash = 5381;
  for (let i = 0; i < source.length; i += 1) {
    hash = ((hash << 5) + hash + source.charCodeAt(i)) | 0;
  }
  return `${RELOAD_KEY_PREFIX}${(hash >>> 0).toString(36)}`;
};

const readReloadFlag = (key) => {
  try {
    return window.sessionStorage.getItem(key) === 'true';
  } catch {
    return false;
  }
};

const writeReloadFlag = (key) => {
  try {
    window.sessionStorage.setItem(key, 'true');
  } catch {
    // sessionStorage недоступний (приватний режим) — просто пропускаємо
  }
};

const clearReloadFlag = (key) => {
  try {
    window.sessionStorage.removeItem(key);
  } catch {
    // те саме
  }
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const importWithTimeout = (importFunc, timeout) =>
  new Promise((resolve, reject) => {
    const timerId = setTimeout(
      () => reject(new Error(`Chunk load timeout after ${timeout}ms`)),
      timeout
    );
    importFunc()
      .then(resolve, reject)
      .finally(() => clearTimeout(timerId));
  });

export const retryImport = async (
  importFunc,
  retries = DEFAULT_RETRIES,
  interval = DEFAULT_INTERVAL,
  timeout = DEFAULT_TIMEOUT
) => {
  const reloadKey = getChunkKey(importFunc);
  let lastError;

  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      const component = await importWithTimeout(importFunc, timeout);
      clearReloadFlag(reloadKey);
      return component;
    } catch (error) {
      lastError = error;
      if (attempt < retries) {
        await wait(interval);
      }
    }
  }

  // Спроби вичерпано. Найімовірніша причина — застарілий чанк після редеплою,
  // тож один раз перезавантажуємо сторінку за свіжим index.html.
  if (!readReloadFlag(reloadKey)) {
    writeReloadFlag(reloadKey);
    window.location.reload();
    // Якщо перезавантаження не відбулось — не залишаємо проміс у pending.
    await wait(5000);
  }

  throw lastError;
};

export const loadComponentWithRetry = (
  importFunc,
  retries = DEFAULT_RETRIES,
  interval = DEFAULT_INTERVAL
) => lazy(() => retryImport(importFunc, retries, interval));

// Vite за замовчуванням кидає непійману помилку на window при невдалому
// preload чанку. Реджект того ж проміса вже обробляє retryImport, тому
// дефолтну поведінку глушимо, щоб вона не валила застосунок.
if (typeof window !== 'undefined') {
  window.addEventListener('vite:preloadError', (event) => {
    event.preventDefault();
  });
}
