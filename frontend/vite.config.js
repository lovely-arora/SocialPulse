import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // ✅ This is important!
    proxy: {
      '/api': { 
        target: 'http://api:8800', // Docker internal service name
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
