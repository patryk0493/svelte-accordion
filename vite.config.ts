import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { join } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: "@", replacement: join(process.cwd(), "src") }],
  },
  plugins: [svelte()],
});
