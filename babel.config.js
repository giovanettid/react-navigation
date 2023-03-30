module.exports = {
  presets: ['@babel/env', ['@babel/react', { runtime: 'automatic' }]],
  plugins: [['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]],
};
