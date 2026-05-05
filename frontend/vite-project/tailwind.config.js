

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
      },
    },
  },
  
}