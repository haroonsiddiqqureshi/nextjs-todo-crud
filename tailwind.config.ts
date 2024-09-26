import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'pastel-background': '#D8E2DC',
        'pastel-foreground': '#c8e0d2',
        'pastel-purple': '#E2CFEA',
        'pastel-green': '#BEE3DB',
        'pastel-yellow': '#FFE5D9',
        'pastel-red': '#FFCAD4',
        'pastel-blue': '#a9c7f5',
        'pastel-purple-dark': '#e1c5ed',
        'pastel-green-dark': '#A3D3C6',
        'pastel-yellow-dark': '#FFD2C3',
        'pastel-red-dark': '#FFAEBB',
        'pastel-blue-dark': '#9abef5',
      },
    },
  },
  plugins: [],
};
export default config;