/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontSize: {
        xss: '0.6rem'
      }
    },
  },
  darkMode: ['selector', '[class*="app-dark"]'],
  plugins: [require('tailwindcss-primeui')],
}

