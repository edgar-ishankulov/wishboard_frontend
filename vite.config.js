import { defineConfig } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';
import inject from '@rollup/plugin-inject';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  build: {
    outDir: 'dist',
    manifest: true
  },

  server: {
    port: 3000,
    watch: {
      usePolling: true,
    },
  },
  plugins: [
    inject({
      $: 'jquery',
    }),
    react(),
    VitePWA({ registerType: 'autoUpdate', injectRegister: 'auto' }),
    svgrPlugin({
      svgrOptions: {
        icon: true,
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
  ],
  
});
