import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 60px rgba(59, 130, 246, 0.18)"
      },
      backgroundImage: {
        "noise-grid": "radial-gradient(circle at 1px 1px, rgba(148,163,184,0.25) 1px, transparent 0)"
      }
    }
  },
  plugins: []
};

export default config;
