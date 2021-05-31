import ts from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import typescript from "typescript";

export default {
  input: "src/index.tsx",
  output: [
    {
      dir: "dist/esm",
      format: "esm",
      //   exports: "named",
    },
    // { dir: "dist/cjs", format: "cjs" , exports: "named"},
  ],
  external: ["react", "clsx", "react-loader-spinner"],
  plugins: [
    postcss({
      plugins: [
        tailwindcss({
          mode: "jit",
          purge: ["./src/**/*.{tsx}"],
        }),
        autoprefixer(),
      ],
    }),
    ts({
      typescript,
    }),
  ],
};
