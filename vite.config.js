import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    server: {
      port: 3000,
      host: true,
    },
    plugins: [
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
      },
    },
    base: '/',
    optimizeDeps: {
      include: [
        '@mui/material/Tooltip',
        '@mui/icons-material',
        '@emotion/styled',
      ],
    },
  };
});
