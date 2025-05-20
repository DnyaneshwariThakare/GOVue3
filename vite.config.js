import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/server': {
        target: 'https://govue3-server.onrender.com/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/server/, ''),
      },
    },
  },
})
