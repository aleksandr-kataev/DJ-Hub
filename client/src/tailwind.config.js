// tailwind.config.js
module.exports = {
  purge: [
    'src/**/*.js',
    'src/**/*.jsx',
    'src/**/*.ts',
    'src/**/*.tsx',
    'public/**/*.html',
  ],
  theme: {
    extend: {
      backgroundOpacity: {
        10: '0.1',
        20: '0.2',
        90: '0.9',
        95: '0.95',
      },
    },
    fontWeight: {
      light: 100,
      book: 300,
      regular: 400,
      bold: 600,
    },
    fontSize: {
      logoL: '65px',
      logoS: '35px',
      menu: '20px',
      sideMenu: '25px',
      modalHeader: '28px',
      modalPlaceholder: '24px',
      modalAction: '24px',
      modalLabel: '24px',
    },
    opacity: {
      0: '0',
      10: '.1',
      20: '.2',
      30: '.3',
      40: '.4',
      50: '.5',
      60: '.6',
      70: '.7',
      80: '.8',
      90: '.9',
      100: '1',
    },
  },
  variants: {},
  plugins: [],
};
