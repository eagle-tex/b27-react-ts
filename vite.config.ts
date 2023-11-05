/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [react()],
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      {
        find: '@assets',
        replacement: path.resolve(__dirname, 'src', 'assets'),
      },
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src', 'components'),
      },
      {
        find: '@helpers',
        replacement: path.resolve(__dirname, 'src', 'helpers'),
      },
    ],
    // alias: {
    //   '@': path.resolve(__dirname, './src/'),
    //   '@assets': `${path.resolve(__dirname, './src/assets/')}`,
    //   '@components': `${path.resolve(__dirname, './src/components/')}`,
    //   '@helpers': `${path.resolve(__dirname, './src/helpers/')}`,
    // },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    // reporters: ['html'],
    root: __dirname,
    setupFiles: ['./src/setupTests.ts', './vitest.setup.ts'],
  },
});
