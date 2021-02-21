import reactRefresh from '@vitejs/plugin-react-refresh';
import builtins from 'rollup-plugin-node-builtins';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  server: {
    proxy: {
      '/v1/graphql': 'http://localhost:8080',
    },
  },
  build: {
    rollupOptions: {
      plugins: [builtins()],
    },
  },
});
