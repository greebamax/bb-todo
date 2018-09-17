/* eslint-disable import/no-extraneous-dependencies */
const { resolve, isAbsolute, join } = require('path');
const jsonServer = require('json-server');
const delayMiddleware = require('./delay');
const { PATH } = require('./helpers');

/**
 * Normalize path to file passed via params or used by default.
 */
const getAbsPathToFile = path => (isAbsolute(path) ? path : resolve(__dirname, path));

const defaults = {
  dbFile: join(__dirname, 'db.json'),
  hostName: 'localhost',
  port: 3000,
  routesFile: join(__dirname, 'routes.json'),
  staticFolder: PATH.DEST,
};

module.exports = options => {
  const {
    dbFile,
    hostName,
    port,
    routesFile,
    staticFolder,
  } = Object.assign(defaults, options);

  const server = jsonServer.create();
  const router = jsonServer.router(getAbsPathToFile(dbFile));
  const middleware = jsonServer.defaults({
    static: resolve(staticFolder),
  });

  server.use(middleware);
  server.use(delayMiddleware);

  const rewriteRules = require(getAbsPathToFile(routesFile)); // eslint-disable-line
  server.use(jsonServer.rewriter(rewriteRules));

  server.use(router);

  server.listen(port, () => {
    console.log(`DEV Server is running on port: http://${hostName}:${port}`);
  });
};
