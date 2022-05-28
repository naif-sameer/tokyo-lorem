import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  build: {
    lib: {
      entry: 'src/tokyo-lorem.ts',
      formats: ['es', 'umd'],
      name: 'lorem-lib',
      fileName: (format) => `lorem-lib.${format}.js`,
    },
    rollupOptions: {
      external: mode === 'production' ? '' : /^lit-element/,
    },
  },
}));
