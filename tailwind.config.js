const typography = require("@tailwindcss/typography");

module.exports = {
  darkMode: "class",
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./Layout/**/*.{js,ts,tsx,jsx}"],
  theme: {
    extend: {
      screens: {
        xs: "425px",
      },
    },

    container: {
      center: true,
      padding: "16px"
    },
  },
  plugins: [typography],
};
