module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true  // ВАЖНО: добавляем node окружение
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  globals: {
    module: 'readonly',  // Явно объявляем module
    require: 'readonly',
    __dirname: 'readonly',
    __filename: 'readonly',
    process: 'readonly'
  },
  rules: {
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'never'],
    'no-console': 'warn'
  }
};