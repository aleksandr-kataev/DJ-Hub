/* eslint-disable linebreak-style */
module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
  },
  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'linebreak-style': ['error', 'windows'],
    'global-require': 0,
    'no-console': 'off',
    'no-underscore-dangle': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'object-curly-newline': [
      2,
      {
        ObjectExpression: {
          consistent: true,
          minProperties: 4,
        },
        ObjectPattern: {
          consistent: true,
          multiline: true,
        },
      },
    ],
  },
};
