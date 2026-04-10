import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    // Optimize chunking for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor libraries into chunks
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-mui': ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
          'vendor-firebase': ['firebase'],
          'vendor-socket': ['socket.io-client'],
        },
      },
    },
    // Improve chunk size warnings
    chunkSizeWarningLimit: 600,
    // Enable source maps for production debugging
    sourcemap: true,
  },
})
