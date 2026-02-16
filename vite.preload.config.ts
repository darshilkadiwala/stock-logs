import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'electron/preload.ts',
      formats: ['cjs'],
    },
    rollupOptions: {
      external: ['electron', 'path', 'fs'], // Don't bundle electron itself
    },
    outDir: '.vite/build',
  },
});
