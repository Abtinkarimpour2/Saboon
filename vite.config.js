import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    // Copy _redirects file to dist for React Router
    copyPublicDir: true,
  },
})

