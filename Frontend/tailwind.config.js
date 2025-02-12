/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",

      md: "1024px",

      lg: "1336px",

      xl: "1280px",

      "2xl": "1440px",
    },

    fontFamily: {
      author: "Homemade Apple",
      roboto: "Roboto",
    },
    extend: {
      colors: {
        primaryRed: "#EE6352",
        primaryGreen: "#9FDC26",
        primaryOrange: "#F29C33",
        primaryBlue: "#C4E5FC",
        dark: "#262522",
        light: "#FFFBF2",
        background: "#F0EBE1",
      },
      backgroundImage: {
        hero: "url('/images/hero-png')",
      },
    },
  },
  plugins: [],
};
