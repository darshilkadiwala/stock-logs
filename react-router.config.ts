import type { Config } from '@react-router/dev/config';

export default {
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,
  // // Build output for Electron - this will contain client/ subdirectory with index.html
  // buildDirectory: 'dist/main_window',
  buildDirectory: 'dist/renderer/main_window',
} satisfies Config;
