import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    outDir: 'dist',
    copyPublicDir: true,
  },
  preview: {
    port: 4173,
    strictPort: true,
  },
  publicDir: 'public',
});
