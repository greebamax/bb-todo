const { resolve } = require('path');
const jsonServer = require('json-server');
const serveStatic = require('serve-static');

const server = jsonServer.create();
const router = jsonServer.router(resolve(__dirname, 'db.json'));
const middlewares = jsonServer.defaults({
  static: resolve(__dirname, '../build'),
});
const delayMiddleware = require('./delay');

server.use(middlewares);
server.use(delayMiddleware);

// serve static file for tests
server.use('/tests', serveStatic(resolve(__dirname, '../tests/browser')));
server.use('/tests/chai', serveStatic(resolve(__dirname, '../node_modules/chai')));

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running');
});
