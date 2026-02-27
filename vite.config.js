import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  base: '/ketoy-web/',
  server: {
    port: 5173
  }
});
