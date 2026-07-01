import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://task-manager-z7kj.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Strips '/api' before sending to backend
      },
    },
  },
})
