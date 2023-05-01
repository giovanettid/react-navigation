const { createProxyMiddleware } = require('http-proxy-middleware');
const apis = require('./apis');

const middleware = apis.map(({ context, options }) =>
  createProxyMiddleware(context, options)
);

module.exports = {
  middleware,
};
