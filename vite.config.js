import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Deployed at the root of dheena731.github.io — no base path needed.
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
