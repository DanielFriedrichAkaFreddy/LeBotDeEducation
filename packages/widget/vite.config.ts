import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    port: 3001,
    proxy: {
      "/chat": "http://localhost:3000",
    },
  },
  plugins: [vue()],
}));
