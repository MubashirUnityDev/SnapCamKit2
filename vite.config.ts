import { defineConfig } from 'vite'

export default defineConfig({
  base: './', // Change this from '/SnapCamKit2/' to './'
  server: {
    port: 3000,
    https: true // Enable HTTPS for camera access
  },
  build: {
    sourcemap: true,
    outDir: 'dist'
  }
})