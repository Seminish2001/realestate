import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f4f7ff",
          100: "#e6eeff",
          200: "#c7d8ff",
          300: "#9eb6ff",
          400: "#6e8cff",
          500: "#3d63ff",
          600: "#2f4ad6",
          700: "#273baa",
          800: "#222f80",
          900: "#1d275f"
        }
      },
      boxShadow: {
        card: "0 12px 40px rgba(15, 23, 42, 0.08)",
        soft: "0 8px 30px rgba(15, 23, 42, 0.12)"
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem"
      }
    }
  },
  plugins: [forms]
};

export default config;
