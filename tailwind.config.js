/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-color': '#333333',
        'light-grey': '#E4E4E4',
        'natural-grey': '#6B6F80',
        'secondary-color': '#009DFF',
        'dark-grey': '#646464',
        'light-blue': '#4f69ff',
      },
    },
  },
  plugins: [],
}

