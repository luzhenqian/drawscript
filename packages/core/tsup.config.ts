import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["index.ts"],
  splitting: false,
  sourcemap: true,
  clean: true,
  target: "es5",
  format: ["cjs", "esm"],
});
