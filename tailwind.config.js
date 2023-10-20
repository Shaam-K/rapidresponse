/*eslint-env node*/ 
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg": "#fcfcfc",
        "accent": '#134dba',
      },
      fontFamily: {
        'OpenSans': ['Open Sans', 'sans-serif'],
        'Roboto': [ 'Roboto', 'sans-serif']
      },
    },
  },
  plugins: [],
}

