import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import vuetify from 'vite-plugin-vuetify';




export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }), // Enabled Vuetify auto import
  ],
  server: {
    host: 'todo-list-dev.com', // This is the hostname that will be used in the browser
    port: 5173,
    strictPort: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
