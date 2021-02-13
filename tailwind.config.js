module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      outline: {
        zesty: ['2px solid #44DA83', '3px'],
        grey: ['2px solid #E5E6E6', '3px'],
        white: ['2px solid white', '4px'],
      },
      margin: {
        auto: 'auto',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Libre Baskerville', 'serif'],
      },
      gridTemplateColumns: {
        footer: '1fr max-content max-content',
      },
      boxShadow: {
        glow: '0 0 64px 8px rgba(229, 230, 230, 0.05)',
      },
      backgroundImage: {
        'contact-pattern': "url('/contact-pattern.svg')",
      },
    },
    colors: {
      white: '#ffffff',
      black: '#000000',
      transparent: 'transparent',
      zesty: {
        600: '#2BB162',
        500: '#2CC36B',
        400: '#44DA83',
        300: '#6EE39E',
      },
      grey: {
        900: '#0F1515',
        800: '#1B2323',
        700: '#293131',
        600: '#374444',
        300: '#D8DCDC',
        200: '#E5E6E6',
        100: '#ECEDED',
      },
    },
  },
  variants: {
    extend: {
      borderRadius: ['first', 'last'],
      margin: ['last'],
    },
  },
  plugins: [],
}
