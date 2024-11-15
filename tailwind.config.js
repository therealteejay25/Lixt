// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#050505",
        light: "#FFFEFF",
        gray: "#393737",
        grey: "#F1F1F1",
        blue: "#1765CB"
      }
    },
  },
  plugins: [],
}
