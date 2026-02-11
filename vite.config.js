import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite"; // 추가
export default defineConfig({
  plugins: [
    tailwindcss(), // tailwindcss 플러그인 추가
  ],
});
