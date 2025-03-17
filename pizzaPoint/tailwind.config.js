/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");
export default withMT({
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {

      colors: {
        brandRed: 'rgb(235, 33, 49)', // Custom alias
      },

      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
});
