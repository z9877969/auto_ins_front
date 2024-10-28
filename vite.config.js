import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    // logLevel: 'info', // Інформаційний рівень логування, можна змінити на 'error' або 'warn'
    // clearScreen: false, // Якщо true, то Vite буде очищати екран при перезавантаженні
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
    ],
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
