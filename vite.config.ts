import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/devweek-2025-frontend/',
  plugins: [react()],
  resolve: {
    alias: {
      app: '/src/app',
      styles: '/src/styles'
    }
  }
});
