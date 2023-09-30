import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import pkg from "./package.json" assert { type: "json" };
import resolve from "@rollup/plugin-node-resolve";
import svelte from "rollup-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";
import svg from 'rollup-plugin-svg';
import typescript from '@rollup/plugin-typescript';

/**
 * @type {import('rollup').RollupOptions}
 */
export default ["es", "umd"].map((format) => {
  const UMD = format === "umd";

  return {
    input: "src/index.ts",
    output: {
      format,
      file: UMD ? pkg.main : pkg.module,
      name: UMD ? "svelte-accordion" : undefined,
      inlineDynamicImports: true,
    },
    external: Object.keys(pkg.dependencies),
    plugins: [
      svelte({
        emitCss: false,
        preprocess: [sveltePreprocess({ typescript: true })],
      }),
      resolve(),
      commonjs(),
      typescript(),
      UMD && terser(),
      svg(),
    ],
  };
});
