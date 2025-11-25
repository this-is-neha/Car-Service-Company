import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    postcss: './postcss.config.cjs', 
  },
  server: {
    proxy: {
      '/uploads': 'http://localhost:3000'
    }
  }
});
