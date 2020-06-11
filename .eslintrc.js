module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
  ],
  plugins: [
    'prettier'
  ],
  // add your custom rules here
  rules: {
      'no-console': "off"
  }
}
