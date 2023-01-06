/** @type {import('tailwindcss').Config} */
module.exports = {

  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'gray': {
          300: '#ced1d4',
          600: '#686b73',
          700: '#20232b',
          800: '#1d1e24',
          900: '#16171b',
        }
      }
    },
    maxWidth: {
      'm': '80%'
    },
    fontSize: {
      xs: '0.7rem'
    }
  },
  plugins: [],
}
