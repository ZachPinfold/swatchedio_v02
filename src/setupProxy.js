const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/palettes/random?format=json",
    createProxyMiddleware({
      target: "http://www.colourlovers.com",
      changeOrigin: true,
      secure: false
    })
  );
};
