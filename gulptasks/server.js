/* eslint-disable import/no-extraneous-dependencies */
const { resolve } = require('path');
const jsonServer = require('json-server');
const delayMiddleware = require('./delay');

module.exports = () => {
  const server = jsonServer.create();
  const router = jsonServer.router(resolve(__dirname, 'db.json'));
  const port = 3000;
  const middleware = jsonServer.defaults({
    static: resolve('build'),
  });

  server.use(middleware);
  server.use(delayMiddleware);

  server.use(router);

  server.listen(port, () => {
    console.log('DEV Server is running on port:', port);
  });
};
