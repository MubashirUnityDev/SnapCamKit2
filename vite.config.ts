import { defineConfig } from 'vite'

export default defineConfig({
  base: '/SnapCamKit2/', // Should match your repository name
  server: {
    port: 3000
  },
  build: {
    sourcemap: true
  }
})