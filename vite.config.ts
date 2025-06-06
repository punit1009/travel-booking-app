import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    base: env.NODE_ENV === 'production' ? '/travel-booking-app/' : '/',
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    // Ensure proper routing in production
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: true,
    },
    server: {
      port: 3000,
      open: true,
    },
  };
});
