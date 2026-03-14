import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "blum-blue": "#5A89FF",
        "blum-yellow": "#FFD200",
      },
    },
  },
  plugins: [],
}

export default config