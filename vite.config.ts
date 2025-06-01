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
      external: [
        'lit',
        'lit/',
        '@lit/context',
        '@google/genai',
        'three',
        'three/'
      ],
      output: {
        globals: {
          'lit': 'Lit',
          'lit/': 'Lit',
          '@lit/context': 'LitContext',
          '@google/genai': 'GoogleGenAI',
          'three': 'THREE',
          'three/': 'THREE'
        },
        dir: 'dist'
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
  server: {
    port: 4173,
    open: true
  }
});
