// One-off: render the OG image (and an apple-touch-icon) to PNG from SVG.
// Run with: node scripts/gen-images.mjs
import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const pub = path.join(dir, "..", "public");

const og = await readFile(path.join(pub, "og-image.svg"));
await sharp(og, { density: 200 })
  .resize(1200, 630, { fit: "fill" })
  .png()
  .toFile(path.join(pub, "og-image.png"));
console.log("wrote og-image.png");

const icon = await readFile(path.join(pub, "favicon.svg"));
await sharp(icon, { density: 300 })
  .resize(180, 180, { fit: "contain", background: { r: 11, g: 16, b: 32, alpha: 1 } })
  .png()
  .toFile(path.join(pub, "apple-touch-icon.png"));
console.log("wrote apple-touch-icon.png");
