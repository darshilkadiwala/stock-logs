import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'electron/main.ts',
      formats: ['cjs'],
      fileName: () => '[name].cjs',
    },
    rollupOptions: {
      external: ['electron', 'path', 'fs'], // Core Node/Electron modules
    },
    outDir: 'dist/build',
  },
});
