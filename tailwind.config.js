module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      margin: {
        auto: 'auto',
      },
    },
    colors: {
      white: '#ffffff',
      transparent: 'transparent',
      zesty: {
        600: '#2BB162',
        500: '#2CC36B',
        400: '#51CD85',
        300: '#79D8A0',
      },
      grey: {
        900: '#101818',
        800: '#1A2323',
        700: '#283131',
        300: '#D8DCDC',
        200: '#E5E6E6',
        100: '#ECEDED',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
