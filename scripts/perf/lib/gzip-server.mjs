// Статичний сервер із обов'язковим gzip для .html/.js/.css/.svg/.json —
// щоб localhost-заміри відповідали тому, що Netlify справді віддає в проді.
// Без цього частина варіантів у попередній сесії роздавалась без стиснення
// (427 КБ проти 147 КБ на головному чанку) і числа виявились несумісними.
import http from 'http';
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const MIME = {
  '.html': 'text/html;charset=utf-8',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.json': 'application/json',
  '.ico': 'image/x-icon',
};

const GZIPPABLE = new Set(['.html', '.js', '.mjs', '.css', '.svg', '.json']);

/**
 * Піднімає статичний SPA-сервер (fallback на index.html для будь-якого
 * шляху, якого немає на диску — як netlify.toml catch-all).
 * @param {string} rootDir - каталог з білдом (dist)
 * @param {number} port
 * @returns {Promise<{url: string, close: () => Promise<void>}>}
 */
export function startStaticServer(rootDir, port) {
  const root = path.resolve(rootDir);

  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    let filePath = path.join(root, urlPath);

    // не виходити за межі root
    if (!filePath.startsWith(root)) {
      filePath = path.join(root, 'index.html');
    }

    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(root, 'index.html');
    }

    const ext = path.extname(filePath);
    const headers = {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    };

    let buf;
    try {
      buf = fs.readFileSync(filePath);
    } catch {
      res.writeHead(404);
      res.end('Not found');
      return;
    }

    const acceptsGzip = /gzip/.test(req.headers['accept-encoding'] || '');
    if (GZIPPABLE.has(ext) && acceptsGzip) {
      const gzipped = zlib.gzipSync(buf, { level: 6 });
      headers['Content-Encoding'] = 'gzip';
      headers['Content-Length'] = gzipped.length;
      res.writeHead(200, headers);
      res.end(gzipped);
    } else {
      headers['Content-Length'] = buf.length;
      res.writeHead(200, headers);
      res.end(buf);
    }
  });

  return new Promise((resolve, reject) => {
    server.on('error', reject);
    server.listen(port, () => {
      resolve({
        url: `http://localhost:${port}`,
        close: () =>
          new Promise((r) => {
            server.close(() => r());
          }),
      });
    });
  });
}
