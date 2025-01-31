/** @type {import('tailwindcss').Config} */
export default {
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
};
