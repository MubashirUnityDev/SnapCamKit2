import { defineConfig } from 'vite'

export default defineConfig({
  base: '/SnapCamKit2/', // Must match your repository name
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  server: {
    port: 3000,
    https: true
  }
})