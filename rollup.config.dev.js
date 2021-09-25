import ts from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import typescript from "typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";

export default {
  input: "src/index.tsx",
  output: [
    {
      dir: "dist/esm",
      format: "esm",
      exports: "named",
    },
    // { dir: "dist/cjs", format: "cjs" , exports: "named"},
  ],
  // external: ["react", "clsx", "react-loader-spinner"],
  // external: ["react", "react-dom"],
  plugins: [
    // nodeResolve({resolveOnly: ["clsx", "react-loader-spinner"]}),
    postcss({
      plugins: [tailwindcss(), autoprefixer()],
    }),
    ts({
      typescript,
    }),
    nodeResolve({
      resolveOnly: ["clsx", "react-loader-spinner", "prop-types"],
    }),
    commonjs(),
    replace({
      "process.env.NODE_ENV": JSON.stringify("development"),
      preventAssignment: true,
    }),
  ],
};
