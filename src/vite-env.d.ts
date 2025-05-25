// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // Ensure the dev server handles all routes by serving index.html
    historyApiFallback: true,
  },
});