import path from 'path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

import manifest from './manifest';

const pwaConfig = {
  registerType: 'autoUpdate',
  includeAssets: [
    'bootstrap.min.css',
    'favicon.ico',
    'logo128.png',
    'logo192.png',
    'logo512.png',
    'robots.txt',
  ],
  workbox: {
    globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,svg,json}'],
  },
  manifest: manifest,
  injectRegister: 'script-defer',
};
export default defineConfig({
  publicDir: 'public', // CRA's default public directory
  plugins: [react(), VitePWA(pwaConfig)],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist', // CRA's default build output
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Example: maps @ to the src directory
      // Add more aliases as needed
    },
  },
});
