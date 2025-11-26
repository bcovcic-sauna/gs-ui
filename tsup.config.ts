import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ['react', 'react-dom'],
  outDir: 'dist',
  // Preserve directory structure for components
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.js' : '.esm.js',
    };
  },
});

