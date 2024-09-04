module.export = {
  env: {
    browser: true,
    es2021: true
  },
  plugins: ['solid'],
  extends: ['standard', 'plugin:solid/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {}
}
