module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'catalina-blue': {
          50: '#f3f5f9',
          100: '#e6ebf3',
          200: '#c1cde0',
          300: '#9baecd',
          400: '#5172a8',
          500: '#063583',
          600: '#053076',
          700: '#052862',
          800: '#04204f',
          900: '#031a40',
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
  variants: {
    extend: {
      visibility: ['group-hover'],
    },
  },
};
