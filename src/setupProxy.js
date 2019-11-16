/* eslint-env node */
const proxy = require('http-proxy-middleware');
let hostName = '192.168.1.44';
try {
  const config = require('../../server/config/config');
  hostName = config.hostName;
} catch (err) {}
const server = process.env.SERVER === 'local' ? 'http://localhost:8080/' : `http://${hostName}:8080/`;

module.exports = function(app) {
  app.use(proxy('/API', { target: server }));
  app.use(proxy('/websocket', { target: server, ws: true }));
};
