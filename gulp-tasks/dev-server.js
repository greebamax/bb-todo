const jsonServer = require('json-server');
const { isAbsolute, join, resolve } = require('path');
const delayMiddleware = require('./delay.js');
const { PATH } = require('./helpers.js');
const defaultRoutes = require('./routes.js');

/**
 * Normalize path to file passed via params or used by default.
 */
const getAbsPathToFile = path => (isAbsolute(path) ? path : resolve(PATH.TASKS_ROOT, path));

const defaults = {
  dbFile: join(PATH.TASKS_ROOT, 'db.json'),
  hostName: 'localhost',
  port: 3000,
  routes: defaultRoutes,
  staticFolder: PATH.DEST,
};

module.exports = options => {
  const {
    dbFile,
    hostName,
    port,
    routes,
    staticFolder,
  } = Object.assign(defaults, options);

  const server = jsonServer.create();
  const router = jsonServer.router(getAbsPathToFile(dbFile));
  const middleware = jsonServer.defaults({
    static: resolve(staticFolder),
  });

  server.use(middleware);
  server.use(delayMiddleware);

  server.use(jsonServer.rewriter(routes));

  server.use(router);

  server.listen(port, () => {
    console.log(`dev-server is running on port: http://${hostName}:${port}`); // eslint-disable-line
  });
};
