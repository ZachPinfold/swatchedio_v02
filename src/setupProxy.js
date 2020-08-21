const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://www.colourlovers.com",
      secure: false,
      changeOrigin: true
    })
  );

  app.use(
    createProxyMiddleware("/api/breeds", {
      target: "https://dog.ceo",
      secure: false,
      changeOrigin: true
    })
  );
};
