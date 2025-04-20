import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/HexdoraCompany/', // <-- BUNU EKLEDİK
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
