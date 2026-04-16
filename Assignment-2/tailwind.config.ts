import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#020617",
        foreground: "#f8fafc",
        muted: "#94a3b8",
        panel: "#0f172a",
        line: "rgba(34, 211, 238, 0.1)",
        accent: "#22d3ee",
        accentStrong: "#0ea5e9"
      },
      boxShadow: {
        card: "0 28px 90px rgba(0, 0, 0, 0.5)",
        glow: "0 0 40px rgba(14, 165, 233, 0.3)"
      },
      backgroundImage: {
        mesh:
          "radial-gradient(circle at top left, rgba(34, 211, 238, 0.15), transparent 24%), radial-gradient(circle at 80% 20%, rgba(14, 165, 233, 0.1), transparent 18%), linear-gradient(180deg, #020617 0%, #000 100%)"
      },
      fontFamily: {
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"]
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        pulseLine: "pulseLine 6s ease-in-out infinite",
        aurora: "aurora 20s linear infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        },
        pulseLine: {
          "0%, 100%": { opacity: "0.35", transform: "scaleX(1)" },
          "50%": { opacity: "0.7", transform: "scaleX(1.03)" }
        },
        aurora: {
          "from": { transform: "rotate(0deg)" },
          "to": { transform: "rotate(360deg)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
