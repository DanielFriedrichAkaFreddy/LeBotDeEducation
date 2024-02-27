import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";
import nesting from "tailwindcss/nesting/index.js";
import scopify from "postcss-scopify";

/** @type {import("postcss-load-config").Config} */
const config = {
  plugins: [tailwind(), autoprefixer()],
};

export default config;
