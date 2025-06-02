import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/Interactive-Document-Widget/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: true,
    target: 'es2020',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        widget: resolve(__dirname, 'widget.js')
      },
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  optimizeDeps: {
    include: ['lit', '@lit/context', 'three', '@google/genai'],
    esbuildOptions: {
      define: {
        'process.env.NODE_ENV': '"production"'
      }
    }
  },
  server: {
    port: 4173,
    open: true
  }
});
