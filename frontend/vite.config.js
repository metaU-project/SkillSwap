import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    outDir: 'dist',
    // Copy _redirects file to dist folder for deployment
    copyPublicDir: true,
  },
  // Configure for SPA routing in production
  preview: {
    port: 4173,
    strictPort: true,
  },
  // Move _redirects to public folder so it gets copied to dist
  publicDir: 'public',
});
