/// <reference types="vitest" />
import { defineConfig } from "vite";
import tailwindcss from "tailwindcss";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
  ],

  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },

  server: {
    port: 5176,
  },

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./test/setup.ts",
  },
});
