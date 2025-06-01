import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'widget.js'),
      name: 'InteractiveDocumentWidget',
      fileName: 'widget',
      formats: ['es']
    },
    rollupOptions: {
      output: {
        format: 'es',
        entryFileNames: 'widget.js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name][extname]'
      }
    },
    sourcemap: true,
    minify: true,
    target: 'es2020'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './')
    }
  },
  optimizeDeps: {
    include: ['lit', '@lit/context', 'three']
  },
  server: {
    port: 4173,
    open: true
  }
});
