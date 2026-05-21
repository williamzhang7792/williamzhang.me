// scripts/og-to-png.mjs — generate /public/og-image.png from /public/og-image.svg
// Run on demand: `node scripts/og-to-png.mjs`. Not part of the regular build.
import { Resvg } from "@resvg/resvg-js";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const svg = readFileSync(resolve(root, "public/og-image.svg"), "utf8");
const resvg = new Resvg(svg, {
  background: "#F5EDDD",
  fitTo: { mode: "width", value: 1200 },
  // Use a generic serif fallback since we don't have local font files matching
  // Cormorant Garamond at convert time. The placeholder OG is acceptable;
  // regenerate with proper fonts via Figma when ready.
  font: { loadSystemFonts: true, defaultFontFamily: "Georgia" },
});
const pngBuffer = resvg.render().asPng();
writeFileSync(resolve(root, "public/og-image.png"), pngBuffer);
console.log("✓ wrote public/og-image.png");
