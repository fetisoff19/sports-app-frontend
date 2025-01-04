module.exports = {
  root: true,
  env: {browser: true, es2020: true},
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended'
  ],
  ignorePatterns: ['dist', 'node_modules', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-hooks/rules-of-hooks': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'comma-style': ['error', 'last'],
    'semi': ['error', 'never'],
    'no-mixed-spaces-and-tabs': 0,
    quotes: ['error', 'single', {'allowTemplateLiterals': true}],
    'react-refresh/only-export-components': [
      'warn',
      {allowConstantExport: true},
    ],
  },
}
