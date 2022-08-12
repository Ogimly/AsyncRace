module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },

  extends: [
    'airbnb-typescript/base',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],

  parser: '@typescript-eslint/parser',

  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  plugins: ['import', '@typescript-eslint', 'prettier'],

  rules: {
    'no-console': 'warn',
    'max-len': ['warn', { code: 120 }],
    indent: ['warn', 2, { SwitchCase: 1 }],
    '@typescript-eslint/indent': ['warn', 2, { SwitchCase: 1 }],
    '@typescript-eslint/no-explicit-any': 'error',
  },

  ignorePatterns: ['*.html', '*config.js'],
};
