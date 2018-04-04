/* eslint-disable import/no-extraneous-dependencies */
const { resolve } = require('path');
const jsonServer = require('json-server');
const delayMiddleware = require('./delay');

const defaults = {
  port: 3000,
  dbFile: './db.json',
  staticFolder: 'build',
  hostName: 'localhost',
};

module.exports = options => {
  const {
    port, dbFile, staticFolder, hostName,
  } = Object.assign(defaults, options);

  const server = jsonServer.create();
  const router = jsonServer.router(dbFile);
  const middleware = jsonServer.defaults({
    static: resolve(staticFolder),
  });

  server.use(middleware);
  server.use(delayMiddleware);

  server.use(router);

  server.listen(port, () => {
    console.log(`DEV Server is running on port: http://${hostName}:${port}`);
  });
};
