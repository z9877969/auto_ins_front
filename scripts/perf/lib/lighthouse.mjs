// Прогін одного lighthouse-заміру. Послідовно, ніколи не паралельно —
// один забруднений прогін уже дав викид 42 замість 61 у попередній сесії.
//
// Навмисно `spawn` + Promise, НЕ `execFileSync`: статичні сервери варіантів
// (lib/gzip-server.mjs) піднімаються в цьому ж Node-процесі, у тому самому
// event loop. execFileSync блокує event loop синхронно на весь час прогону
// lighthouse — а це саме той процес, що має обслуговувати HTTP-запити від
// хрому lighthouse. Класичний самодедлок: порт слухає, з'єднання прийняте
// ядром (видно в `ss -ltn` як Recv-Q>0), а обробити його нікому, бо потік
// зайнятий очікуванням execFileSync. spawn — асинхронний, event loop
// лишається вільним обслуговувати сервер, поки lighthouse працює.
import { spawn } from 'child_process';
import fs from 'fs';

export function runLighthouse(url, outJsonPath) {
  const args = [
    '--yes',
    'lighthouse@12',
    url,
    '--only-categories=performance',
    '--output=json',
    `--output-path=${outJsonPath}`,
    '--chrome-flags=--headless=new --no-sandbox --disable-dev-shm-usage',
    '--quiet',
  ];

  return new Promise((resolve, reject) => {
    const child = spawn('npx', args, {
      stdio: ['ignore', 'inherit', 'inherit'],
      env: { ...process.env, CHROME_PATH: process.env.CHROME_PATH || '/snap/bin/chromium' },
    });

    child.on('error', reject);
    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`lighthouse завершився з кодом ${code} (url=${url})`));
        return;
      }
      try {
        resolve(JSON.parse(fs.readFileSync(outJsonPath, 'utf8')));
      } catch (err) {
        reject(err);
      }
    });
  });
}
