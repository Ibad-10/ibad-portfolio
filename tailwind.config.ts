import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        syne: ["var(--font-syne)", "sans-serif"],
      },
      colors: {
        bg: "#050505",
        "bg-2": "#080808",
        red: "#FF4D2D",
        muted: "#333333",
        subtle: "#555555",
        border: "rgba(255,255,255,0.07)",
      },
      animation: {
        ticker: "ticker 30s linear infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
