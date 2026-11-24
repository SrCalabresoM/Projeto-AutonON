/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html",
    "./src/**/*.{html,js}"
  ], 
  theme: {
    extend: {
      colors: {
        'charleston-green': '#2A2829',
        'dark-sky-blue': '#97B4DE',
        'custom-blue': '#263A99',
        'alabaster': '#F0EBE5',
        'pastel-gray': '#DCD0BE',
      },
      fontFamily: {
        sans: ['Work Sans', 'sans-serif'],
        display: ['Raleway', 'sans-serif'],
      },
    }
  },
  plugins: [],
}
