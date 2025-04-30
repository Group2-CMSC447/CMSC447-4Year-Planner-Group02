/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // primary colors of umbc
        umbcGold: '#fdb515',
        umbcBlack: '#000000',
        //secondary colors of umbc
        umbcRed: '#da2128',
        umbcLightGray: '#c7c8ca',
        umbcTeal: '#007176',
        umbcRetBrown: '#a67a05',
        umbcDarkGray: '#636466'
      }
    },
  },
  plugins: [],
}