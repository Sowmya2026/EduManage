module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#E1EEBC',
          200: '#90C67C',
          300: '#67AE6E',
          400: '#328E6E',
          500: '#267155',
        }
      },
      animation: {
        'float': 'float 10s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
      }
    },
  },
  plugins: [],
}