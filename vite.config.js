import { defineConfig } from 'vite';

export default defineConfig({
  base: '/optimiapmo/',
  root: './',
  publicDir: 'public',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'esbuild'
  }
});
