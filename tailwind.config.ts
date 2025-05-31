import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{mdx}", // MDX 파일까지 포함되게
  ],
  theme: {
    extend: {},
  },
  plugins: [typography], // ✅ 여기에 추가
};

export default config;
