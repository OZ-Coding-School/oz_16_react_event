import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // path 모듈 임포트
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  },
})