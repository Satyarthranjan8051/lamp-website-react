/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7ed',
          100: '#fdedd7',
          200: '#fad5aa',
          300: '#f6b571',
          400: '#f18b37',
          500: '#ed6b13',
          600: '#de5209',
          700: '#b83e0a',
          800: '#933210',
          900: '#762b10',
        },
      },
      fontFamily: {
        'primary': ['Poppins', 'sans-serif'],
        'secondary': ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(90deg, hsl(15, 68%, 42%) 0%, hsl(20, 68%, 80%) 100%)',
        'second-gradient': 'linear-gradient(90deg, hsl(20, 72%, 57%) 0%, hsl(20, 78%, 80%) 100%)',
        'third-gradient': 'linear-gradient(90deg, hsl(15, 70%, 40%) 0%, hsl(20, 62%, 60%) 100%)',
      },
    },
  },
  plugins: [],
}
