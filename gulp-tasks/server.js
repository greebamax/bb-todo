/* eslint-disable import/no-extraneous-dependencies */
const { resolve, isAbsolute } = require('path');
const jsonServer = require('json-server');
const delayMiddleware = require('./delay');

const getAbsPathToFile = path => (isAbsolute(path) ? path : resolve(__dirname, path));

const defaults = {
  dbFile: './db.json',
  hostName: 'localhost',
  port: 3000,
  routesFile: './routes.json',
  staticFolder: 'build',
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
