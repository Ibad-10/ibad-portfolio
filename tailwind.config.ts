import type { Config } from "tailwindcss";

const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-manrope)", "system-ui", "sans-serif"],
        sans: ["var(--font-geist)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      colors: {
        bg: token("bg"),
        panel: token("panel"),
        text: token("text"),
        muted: token("muted"),
        blue: token("blue"),
        "blue-strong": token("blue-strong"),
        garnet: token("garnet"),
        gold: token("gold"),
        line: token("line"),
      },
    },
  },
  plugins: [],
};

export default config;
