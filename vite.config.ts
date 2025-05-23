import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';

  return {
    base: '/',
    server: {
      ...(isDev && {
        https: {
          key: fs.readFileSync(resolve(__dirname, 'localhost-key.pem')),
          cert: fs.readFileSync(resolve(__dirname, 'localhost.pem'))
        }
      }),
      proxy: {
        '/api': {
          target: 'https://91.142.79.127',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    plugins: [react()],
    resolve: {
      alias: {
        app: '/src/app',
        assets: '/src/assets',
        features: '/src/features',
        pages: '/src/pages',
        services: '/src/services',
        shared: '/src/shared',
        styles: '/src/styles',
        widgets: '/src/widgets'
      }
    }
  };
});
