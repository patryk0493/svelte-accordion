/// <reference types="vitest" />
import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte({ hot: !process.env.VITEST })],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest-setup.ts"],
    exclude: [...configDefaults.exclude, ".svelte-kit/**/*"],
    coverage: {
      reporter: ["text", "json-summary", "json", "html"],
    },
  },
  base: "/svelte-epic-accordion",
});
