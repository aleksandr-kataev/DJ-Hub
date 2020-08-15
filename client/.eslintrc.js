/* eslint-disable linebreak-style */
module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'operator-linebreak': [
      'error',
      'after',
      {
        overrides: {
          ':': 'before',
        },
      },
    ],
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: true },
    ],
    'linebreak-style': 0,
    'global-require': 0,
    'eslint linebreak-style': [0, 'error', 'windows'],
    'jsx-quotes': [2, 'prefer-single'],
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx'] },
    ],
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
  root: true,
};
