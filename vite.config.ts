import { defineConfig } from 'vite'

export default defineConfig({
  base: './', // Change this for local development
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  server: {
    port: 3000,
    https: true
  }
})