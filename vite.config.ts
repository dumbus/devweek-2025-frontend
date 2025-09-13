import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    base: '/devweek-2025-frontend',
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
