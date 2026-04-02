import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#030503",
        foreground: "#f6fff2",
        muted: "#8ea28a",
        panel: "#0c120c",
        line: "rgba(149,255,84,0.16)",
        accent: "#7dff2f",
        accentStrong: "#b7ff2b"
      },
      boxShadow: {
        card: "0 28px 90px rgba(0, 0, 0, 0.42)",
        glow: "0 0 40px rgba(125, 255, 47, 0.28)"
      },
      backgroundImage: {
        mesh:
          "radial-gradient(circle at top left, rgba(125,255,47,0.18), transparent 24%), radial-gradient(circle at 80% 20%, rgba(183,255,43,0.14), transparent 18%), linear-gradient(180deg, #090f09 0%, #030503 100%)"
      },
      fontFamily: {
        display: ['"Arial Black"', '"Helvetica Neue"', "sans-serif"],
        body: ['"Helvetica Neue"', '"Segoe UI"', "sans-serif"]
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        pulseLine: "pulseLine 6s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        },
        pulseLine: {
          "0%, 100%": { opacity: "0.35", transform: "scaleX(1)" },
          "50%": { opacity: "0.7", transform: "scaleX(1.03)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
