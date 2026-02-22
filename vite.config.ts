import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// This config is used when running `npm run dev` or `npm run build` directly
// For Electron, vite.renderer.config.ts is used instead
export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  build: {
    // This ensures RR v7 outputs to the location Forge expects
    // outDir: '.vite/renderer/main_window',
    // outDir: 'dist/main_window',
  },

  // base: './',
  // Remove build.outDir - this conflicts with Electron Forge
  // If you need to run as a web app, uncomment:
  // build: { outDir: 'dist/web' },
});
