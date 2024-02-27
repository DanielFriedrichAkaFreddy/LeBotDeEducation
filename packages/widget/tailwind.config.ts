import { Config } from "tailwindcss";
import daisyui from "daisyui";
import scrollbar from "tailwind-scrollbar";
import { scopedPreflightStyles } from "tailwindcss-scoped-preflight";

export default {
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
    scrollbar,
    scopedPreflightStyles({
      cssSelector: "#app",
    }),
  ],
  daisyui: {
    themeRoot: "#app",
    base: false,
  },
} satisfies Config;
