import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  // Relative URLs keep the build working both at / locally and under the
  // /run-fpl/ project path used by GitHub Pages.
  base: "./",
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        updates: resolve(import.meta.dirname, "updates.html"),
      },
    },
  },
});
