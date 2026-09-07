// Компілює scripts/prerender/entry.jsx (JSX + emotion babel plugin + імпорти
// картинок) у runnable Node ESM-модуль через програмний Vite build.
// Технічно можна було б написати рендер руками під plain Node, але тоді
// довелось би вручну імітувати babel/emotion-трансформ і резолв assetів —
// простіше й надійніше прогнати той самий Vite pipeline, що й основний білд.
import { build } from 'vite';
import path from 'path';
import fs from 'fs';

const HERE = path.dirname(new URL(import.meta.url).pathname);
const REPO_ROOT = path.resolve(HERE, '..', '..');

export async function buildShellModule() {
  // Навмисно НЕ os.tmpdir(): SSR-білд екстерналізує react/@mui/emotion (не
  // бандлить їх — це і швидше, і правильно), тож entry.mjs резолвить їх як
  // звичайні bare-імпорти через Node module resolution, яка йде вгору по
  // директоріях у пошуках node_modules. os.tmpdir() лежить поза деревом
  // репозиторію і жодного node_modules там не знайде. Каталог гітігнорений.
  const outDir = fs.mkdtempSync(path.join(REPO_ROOT, '.tmp-prerender-'));

  try {
    // Навмисно перевикористовуємо реальний vite.config.js проєкту (той самий
    // assetsInlineLimit/base/alias), а не голий конфіг: інакше картинки
    // хешуються за іншими правилами (напр. дефолтний inline-ліміт 4096
    // замість 2048 з проєкту — і car_mobile.webp 3070 Б тихо піде в base64
    // замість хешованого файлу, з яким має збігтись розмітка).
    await build({
      root: REPO_ROOT,
      configFile: path.join(REPO_ROOT, 'vite.config.js'),
      logLevel: 'warn',
      build: {
        ssr: path.join(HERE, 'entry.jsx'),
        outDir,
        emptyOutDir: true,
        minify: false,
        rollupOptions: {
          output: { format: 'es', entryFileNames: 'entry.mjs' },
        },
      },
      // @mui/* та @emotion/* публікують ESM-файли з directory-імпортами без
      // розширень (розраховані на бандлер, не на нативний Node ESM-резолвер) —
      // якщо лишити їх зовнішніми, `import` падає на ERR_UNSUPPORTED_DIR_IMPORT.
      // Бандлимо саме їх; react/react-dom лишаємо зовнішніми — це нормальні
      // dual CJS/ESM пакети, і react-dom/server сам залежить від вбудованих
      // Node-модулів (util тощо), які rollup узагалі не вміє бандлити.
      ssr: { noExternal: [/^@mui\//, /^@emotion\//] },
    });
  } catch (err) {
    fs.rmSync(outDir, { recursive: true, force: true });
    throw err;
  }

  return { outDir, entryPath: path.join(outDir, 'entry.mjs') };
}
