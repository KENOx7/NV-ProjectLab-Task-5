/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cinema: '#e50935',
        night: '#09090b',
      },
    },
  },
  plugins: [],
}