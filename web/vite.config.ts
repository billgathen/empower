import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, "../cmd/web/static"),
    emptyOutDir: false,
    sourcemap: true,
    manifest: false,
    rollupOptions: {
      input: path.resolve(__dirname, "src/main.tsx"),
      output: {
        entryFileNames: "app.js",
        chunkFileNames: "chunks/[name].js",
        assetFileNames: (assetInfo) => {
          // Make the filename for imported CSS static
          const originals = assetInfo.originalFileNames ?? [];

          if (originals.some(f => f.endsWith(".css"))) {
            return "app.css";
          }

          return "assets/[name][extname]";
        }
      }
    }
  }
})
