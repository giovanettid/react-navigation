module.exports = {
  extends: ['airbnb', 'plugin:react-hooks/recommended', 'plugin:jsx-a11y/recommended'],
  globals: {
    document: false,
  },
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  plugins: ['react-hooks', 'jsx-a11y'],
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
