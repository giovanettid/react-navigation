module.exports = {
  extends: [
    'airbnb',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  globals: {
    window: false,
    navigator: true,
    self: true,
    document: false,
    alert: false,
  },
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-alert': 'off',
    'prettier/prettier': 'error',
  },
  plugins: ['react-hooks', 'jsx-a11y', 'prettier'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src', 'test/unit', 'test/e2e'],
      },
    },
  },
};
