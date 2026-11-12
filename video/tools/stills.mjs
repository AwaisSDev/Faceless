// Render a list of stills with one bundle: node tools/stills.mjs Video1 out/stills 100 2000 ...
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import path from "path";
import fs from "fs";

const [, , compId, outDir, ...frames] = process.argv;
fs.mkdirSync(outDir, { recursive: true });
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const composition = await selectComposition({ serveUrl, id: compId, inputProps: {} });
console.log(compId, "duration", composition.durationInFrames, (composition.durationInFrames / 60 / 60).toFixed(2), "min");
for (const fr of frames) {
  const out = path.join(outDir, `${compId}_${String(fr).padStart(6, "0")}.jpg`);
  await renderStill({ composition, serveUrl, frame: Number(fr), output: out, imageFormat: "jpeg", jpegQuality: 85, scale: 0.5 });
  console.log("wrote", out);
}
