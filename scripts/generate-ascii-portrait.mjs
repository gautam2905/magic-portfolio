#!/usr/bin/env node
// Generates /public/me-ascii.txt from /public/me.jpg.
// Run: node scripts/generate-ascii-portrait.mjs
//
// Tweakables:
//   COLS        — output width in characters (height auto-derived)
//   ASPECT      — character aspect ratio (chars are taller than wide)
//   RAMP        — char ramp from darkest → lightest
//   CONTRAST    — boost (>1) or soften (<1) the source contrast

import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";

const COLS = 56;
const ASPECT = 0.5; // chars are ~2x as tall as wide; halve rows
const RAMP = " .:-=+*#%@"; // 10 levels, dark → light
const CONTRAST = 1.15;

const root = process.cwd();
const SRC = join(root, "public", "me.jpg");
const OUT = join(root, "public", "me-ascii.txt");

const meta = await sharp(SRC).metadata();
const rows = Math.round((COLS * meta.height) / meta.width * ASPECT);

const { data, info } = await sharp(SRC)
  .resize(COLS, rows, { fit: "fill" })
  .grayscale()
  .normalise()
  .linear(CONTRAST, -(128 * (CONTRAST - 1))) // contrast around midpoint
  .raw()
  .toBuffer({ resolveWithObject: true });

let out = "";
for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    const v = data[y * info.width + x]; // 0..255
    const idx = Math.min(RAMP.length - 1, Math.floor((v / 256) * RAMP.length));
    out += RAMP[idx];
  }
  out += "\n";
}

await writeFile(OUT, out, "utf8");
console.log(`wrote ${OUT}  (${info.width}×${info.height} chars)`);
