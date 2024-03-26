/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./styles/**/*.{js,css}",
    "./views/**/*.ejs"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],

}