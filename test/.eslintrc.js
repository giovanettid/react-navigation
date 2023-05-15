module.exports = {
  extends: [
    'plugin:jest/recommended',
    'plugin:testing-library/react',
    'plugin:jest-dom/recommended',
  ],
  globals: {
    describe: false,
    it: false,
    beforeAll: false,
    beforeEach: false,
    afterAll: false,
    afterEach: false,
    expect: false,
    sinon: false,
    browser: false,
    $: false,
  },
  rules: {
    'no-unused-expressions': 'off',
    'jest/expect-expect': [
      'error',
      { assertFunctionNames: ['expect', 'expectItineraryAndMarkers'] },
    ],
  },
  plugins: ['jest', 'testing-library', 'jest-dom'],
};
