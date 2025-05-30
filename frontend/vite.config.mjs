// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,   // equivalent to '0.0.0.0'
    port: 5173,   // optional, but makes it explicit
  },
});
