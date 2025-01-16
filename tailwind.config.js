/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        darkred: "#662524ff",
        barnred: "#6E130F",
        myred: "#95282B",
        dimred: "#CF5156ff",
        lightred: "#E6656Bff",
        mywhite: " #F8D5C4ff",
        myblack: "#242623ff",
      },
      fontFamily: {
        'valiny': ['valiny'],
        'breathing': ['breathing']
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '-6px 10px 4px var(--tw-shadow-color)',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
      { values: theme('textShadow') }
      )
    }),
  ],
}