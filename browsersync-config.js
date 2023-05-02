const { createProxyMiddleware } = require('http-proxy-middleware');
const historyApiFallback = require('connect-history-api-fallback');
const apis = require('./apis');

const middleware = apis.map(({ context, options }) =>
  createProxyMiddleware(context, options)
);
middleware.push(historyApiFallback());

module.exports = {
  middleware,
};
