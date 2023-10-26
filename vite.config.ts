import * as path from 'node:path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import Printer from 'vite-host-qrcode/vite';
import checker from 'vite-plugin-checker';
import EnvironmentPlugin from 'vite-plugin-environment';
import ResizeImage from 'vite-plugin-resize-image/vite';
import webfontDownload from 'vite-plugin-webfont-dl';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode !== 'production';
  const isAnalyze = mode === 'analyze';

  return {
    plugins: [
      react(),
      EnvironmentPlugin('all'),
      checker({
        typescript: true,
      }),
      Printer({
        info: [
          ({ bold, cyan, green }) => {
            return {
              text: `  ${green('➜')}  ${bold('Font Icon:')} ${bold(
                cyan('http://localhost:4005/public/t4font/index.html'),
              )}`,
            };
          },
        ],
      }),
      ResizeImage({
        mode: 'sharp',
        cache: true,
        compress: {
          jpg: {
            quality: 70,
          },
          jpeg: {
            quality: 70,
          },
          png: {
            quality: 70,
          },
          webp: {
            quality: 70,
          },
        },
        conversion: [
          { from: 'jpeg', to: 'webp' },
          { from: 'png', to: 'webp' },
          { from: 'JPG', to: 'jpeg' },
        ],
      }),
      webfontDownload(),
    ],
    css: {
      devSourcemap: isDev,
    },
    optimizeDeps: {
      include: ['react'],
    },
    build: {
      commonjsOptions: {
        include: [/node_modules/],
      },
      sourcemap: isAnalyze,
    },
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
    esbuild: {
      sourcemap: isDev,
    },
    server: {
      port: 4005,
    },
    preview: {
      port: 4005,
    },
  };
});
