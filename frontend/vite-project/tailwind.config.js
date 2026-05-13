

/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    ".flowbite-react\\class-list.json"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Cinzel', 'serif'],
      },
      colors: {
        charcoal: '#1A1A1A',
        'oat-gold': '#C8A97E',
        sage: '#506C59',
        cream: '#FAF8F5',
        coffee: {
          50: '#f9f5f0',
          100: '#f0e3d4',
          200: '#e1cdb5',
          300: '#c7b198',
          400: '#a68a6d',
          500: '#8b7e74',
          600: '#705a4f',
          700: '#5f4435',
          800: '#4a352c',
          900: '#3c2a21',
          950: '#1a100d',
        },
      },
    },
  },
  
}