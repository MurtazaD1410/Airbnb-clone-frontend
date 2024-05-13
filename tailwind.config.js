/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    screens: {
      xxs: "400px",
      xs: "500px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        // primary: "#FF385C",
        primary: "#3d91ff",
        secondary: "#484848",
      },
    },
  },
  plugins: [],
};
