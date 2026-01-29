import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import svelteSVG from "vite-plugin-svelte-svg";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const frontDir = "front-src";
const publicDir = "app/client";
const clientDir = `${frontDir}/client`;

const isDev = process.env.NODE_ENV !== "production";

export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: {
        dev: isDev,
      },
    }),
    svelteSVG({
      svgoConfig: {},
      requireSuffix: false,
    }),
  ],
  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, clientDir),
    },
  },
  build: {
    outDir: publicDir,
    emptyOutDir: false,
    lib: {
      entry: {
        index: path.resolve(__dirname, `${clientDir}/index.js`),
        overlay: path.resolve(__dirname, `${frontDir}/overlay/overlay.js`),
      },
      formats: ["es"],
      fileName: (format, entryName) => `js/${entryName}.js`,
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) {
            return "css/[name][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
    sourcemap: true,
    minify: process.env.NODE_ENV === "production",
  },
  server: {
    port: 5173,
    strictPort: false,
  },
});
