/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1440px",
      xxxl: "1600px",
      xxxxl: "2000px",
      "hover-hover": { raw: "(hover: hover)" },
    },
    colors: {
      white: "#ffffff",
      "neutral-50": "hsl(250,10%,95%)",
      "neutral-100": "#e6e8f4",
      "neutral-200": "hsl(250,10%,80%)",
      "neutral-900": "#333333",
      "neutral-blue": "#94c2e7",
      "light-blue": "#4dadfa",
      blue: "#2b87d1",
      "dark-blue": "#2573c1",
      "very-dark-blue": "#154368",
      yellow: "#ffd154",
      red: "#f53264",
      orange: "#ff9345",
      green: "#14bf61",
    },
  },
  plugins: [],
};
