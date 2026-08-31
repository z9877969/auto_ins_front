import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import dotenv from 'dotenv';

dotenv.config();

// Vite не переписує `imagesrcset` у index.html, тож preload зображення героя
// лишався б із шляхами на /src/... і 404-ив у білді. Плагін підміняє їх на
// підсумкові хешовані імена з бандла.
const rewriteHtmlAssetUrls = () => ({
  name: 'rewrite-html-asset-urls',
  transformIndexHtml: {
    order: 'post',
    handler(html, ctx) {
      if (!ctx.bundle) return html;

      const fileNameByAssetName = new Map();
      for (const output of Object.values(ctx.bundle)) {
        if (output.type === 'asset' && output.name) {
          fileNameByAssetName.set(output.name, output.fileName);
        }
      }

      return html.replace(/\/src\/images\/[^\s",]+/g, (url) => {
        const fileName = fileNameByAssetName.get(url.split('/').pop());
        return fileName ? `/${fileName}` : url;
      });
    },
  },
});

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    server: {
      host: true,
      port: 3000,
    },
    plugins: [
      rewriteHtmlAssetUrls(),
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
    ],
    resolve: {
      alias: {
        modules: '/src/modules',
        hooks: '/src/hooks',
        pages: '/src/pages',
        '@redux': '/src/redux',
        shared: '/src/shared',
        helpers: '/src/helpers',
        context: '/src/context',
        services: '/src/services',
        '@constants': '/src/constants',
        images: '/src/images',
        assets: '/src/assets',
        components: '/src/components',        
        style: '/src/style',        
      },
    },
    base: '/',
    build: {
      // car_mobile.webp — 3070 Б, з дефолтним лімітом 4096 він інлайниться в JS
      // і preload не має на що вказувати.
      assetsInlineLimit: 2048,
    },
    optimizeDeps: {
      include: [
        '@mui/material/Tooltip',
        '@mui/icons-material',
        '@emotion/styled',
      ],
    },
  };
});
