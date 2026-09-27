import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? '/.zwd-website/',
  plugins: [react(), tailwindcss()],
  build: { sourcemap: true, cssCodeSplit: true },
});
