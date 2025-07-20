// frontend/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://api:8800',  // fixed: 'api' not 'backend'
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
