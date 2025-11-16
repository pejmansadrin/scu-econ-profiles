// vite.config.js (کامل و نهایی)

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        // ورودی صفحه اصلی (root)
        main: resolve(__dirname, 'index.html'),
        // ورودی صفحه لیدربورد
        leaderboard: resolve(__dirname, 'leaderboard.html'),
      },
    },
  },
})