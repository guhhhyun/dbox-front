const createProxyMiddleware = require("http-proxy-middleware");

const target = process.env.PROXY || "http://localhost:8080";

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target,
      changeOrigin: true,
    }),
  );
  app.use(
    "/kupload",
    createProxyMiddleware({
      target,
      changeOrigin: true,
    }),
  );
};
