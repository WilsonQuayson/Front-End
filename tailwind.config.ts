import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sand: ["Roboto", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        pastel: {
          50: "#f8f8f8",
          100: "#f1efef",
          200: "#e6e2e2",
          300: "#d4cdcd",
          400: "#b9b0b0",
          500: "#a09393",
          600: "#877b7b",
          700: "#706565",
          800: "#5e5656",
          900: "#524b4b",
          950: "#2a2525",
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
