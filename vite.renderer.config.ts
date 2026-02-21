import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// Vite config for Electron renderer (WITHOUT React Router plugin)
// React Router v7 framework mode is incompatible with Electron Forge
// Electron loads from React Router dev server (localhost:5173) instead
export default defineConfig({
  plugins: [tailwindcss(), tsconfigPaths()],
  build: {
    outDir: 'dist/build',
  },
});
