// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0f",
        primary: "#00ff9f",
        accent: "#ff2d78",
        secondary: "#00cfff",
        muted: "#3a3a4a",
        "text-main": "#e0e0e0",
      },
      fontFamily: {
        pixel: ["'Press Start 2P'", "cursive"],
        mono: ["'VT323'", "monospace"],
        code: ["'Share Tech Mono'", "monospace"],
      },
      animation: {
        "glitch-1": "glitch1 0.3s infinite linear alternate-reverse",
        "glitch-2": "glitch2 0.3s infinite linear alternate-reverse",
        blink: "blink 1s step-end infinite",
        "float-up": "floatUp 8s linear infinite",
        "pixel-bounce": "pixelBounce 1s steps(4) infinite",
      },
      keyframes: {
        glitch1: {
          "0%": { clipPath: "inset(40% 0 61% 0)", transform: "translate(-2px, 0)" },
          "20%": { clipPath: "inset(92% 0 1% 0)", transform: "translate(1px, 0)" },
          "40%": { clipPath: "inset(43% 0 1% 0)", transform: "translate(-1px, 0)" },
          "60%": { clipPath: "inset(25% 0 58% 0)", transform: "translate(2px, 0)" },
          "80%": { clipPath: "inset(54% 0 7% 0)", transform: "translate(-1px, 0)" },
          "100%": { clipPath: "inset(58% 0 43% 0)", transform: "translate(1px, 0)" },
        },
        glitch2: {
          "0%": { clipPath: "inset(25% 0 58% 0)", transform: "translate(2px, 0)" },
          "20%": { clipPath: "inset(54% 0 7% 0)", transform: "translate(-2px, 0)" },
          "40%": { clipPath: "inset(58% 0 43% 0)", transform: "translate(1px, 0)" },
          "60%": { clipPath: "inset(40% 0 61% 0)", transform: "translate(-1px, 0)" },
          "80%": { clipPath: "inset(92% 0 1% 0)", transform: "translate(2px, 0)" },
          "100%": { clipPath: "inset(43% 0 1% 0)", transform: "translate(-2px, 0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        floatUp: {
          "0%": { transform: "translateY(100vh) translateX(0px)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(-100px) translateX(20px)", opacity: "0" },
        },
        pixelBounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
