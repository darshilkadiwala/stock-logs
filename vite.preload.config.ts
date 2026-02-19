import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'electron/preload.ts',
      formats: ['cjs'],
      fileName: () => '[name].cjs',
    },
    rollupOptions: {
      external: ['electron', 'path', 'fs'], // Don't bundle electron itself
      output: { entryFileNames: '[name].cjs' },
    },
    outDir: 'dist/build',
  },
});
