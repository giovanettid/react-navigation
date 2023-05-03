const { createProxyMiddleware } = require('http-proxy-middleware');
const historyApiFallback = require('connect-history-api-fallback');
const apis = require('./apis');

const api = process.env.API || 'public';

const middleware = apis[api].map(({ context, options }) =>
  createProxyMiddleware(context, options)
);
middleware.push(historyApiFallback());

module.exports = {
  middleware,
};
