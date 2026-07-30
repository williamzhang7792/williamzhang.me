// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Surfaced as import.meta.env.BUILD_DATE inside components.
const BUILD_DATE = "2026.07.30";

// https://astro.build/config
export default defineConfig({
  site: "https://williamzhang.me",
  output: "static",
  trailingSlash: "ignore",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    define: {
      "import.meta.env.BUILD_DATE": JSON.stringify(BUILD_DATE),
    },
  },
});
