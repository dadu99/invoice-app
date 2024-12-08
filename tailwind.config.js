/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontSize: {
      xs: ["12px", "16px"],
      sm: ["14px", "20px"],
      base: ["16px", "22px"],
      lg: ["18px", "24px"],
      xl: ["20px", "26px"],
      "2xl": ["35px","30px"],
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#333",  
        },
        secondary: "#6d6f79"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}