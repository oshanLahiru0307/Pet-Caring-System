/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
    theme: {
      extend: {
        colors: {
          teal: {
            50: '#e6f7f4',
            100: '#c9eee7',
            600: '#0f766e',
            700: '#115e59',
            800: '#0f4e4a',
            900: '#0b3c39',
          },
        },
      },
    },
    plugins: [],
}

