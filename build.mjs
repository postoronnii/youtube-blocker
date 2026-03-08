import * as esbuild from "esbuild";
import { cpSync, rmSync, mkdirSync } from "fs";

rmSync("dist", { recursive: true, force: true });
mkdirSync("dist/content", { recursive: true });
mkdirSync("dist/background", { recursive: true });
mkdirSync("dist/popup", { recursive: true });
mkdirSync("dist/icons", { recursive: true });

const shared = { bundle: true, target: "chrome120", minify: true };

await Promise.all([
  // Content script — must be IIFE (no ES module support in content scripts)
  esbuild.build({
    ...shared,
    entryPoints: ["src/content/index.ts"],
    outfile: "dist/content/content.js",
    format: "iife",
  }),

  // Service worker — ES module
  esbuild.build({
    ...shared,
    entryPoints: ["src/background/service-worker.ts"],
    outfile: "dist/background/service-worker.js",
    format: "esm",
  }),

  // Popup script — ES module
  esbuild.build({
    ...shared,
    entryPoints: ["src/popup/popup.ts"],
    outfile: "dist/popup/popup.js",
    format: "esm",
  }),
]);

cpSync("src/manifest.json", "dist/manifest.json");
cpSync("src/popup/index.html", "dist/popup/index.html");
cpSync("src/popup/popup.css", "dist/popup/popup.css");
cpSync("src/content/ui/styles.css", "dist/content/styles.css");
cpSync("public/icons", "dist/icons", { recursive: true });

console.log("Build complete.");
