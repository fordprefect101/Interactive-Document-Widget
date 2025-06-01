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
      external: ['lit', '@lit/context', 'three'],
      output: {
        globals: {
          'lit': 'Lit',
          '@lit/context': 'LitContext',
          'three': 'THREE'
        }
      }
    },
    sourcemap: true,
    minify: true,
    target: 'es2020'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
      'lit': 'https://esm.sh/lit@^3.3.0',
      '@lit/context': 'https://esm.sh/@lit/context@^1.1.5',
      'three': 'https://esm.sh/three@^0.176.0'
    }
  },
  server: {
    port: 4173,
    open: true
  }
});
