const proxy = require('http-proxy-middleware');
const server = process.env.SERVER === "local" ? 'http://localhost:8080/' : 'http://raspberrypi.local:8080/';

module.exports = function(app) {
  app.use(proxy('/API', { target: server}));
  app.use(proxy('/websocket', { target: server, ws:true}));
};