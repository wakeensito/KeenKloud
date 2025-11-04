import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3000,
    open: true,
    host: '0.0.0.0', // Allow network access - listen on all interfaces
    strictPort: false // If port is in use, try next available
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})

