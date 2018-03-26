const livereload = require('livereload');

module.exports = opts => {
  const liveReloadServer = livereload.createServer({
    delay: opts.delay || 1000,
  });

  liveReloadServer.watch(opts.target);
};
