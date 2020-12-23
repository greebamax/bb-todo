const livereload = require('livereload');

module.exports = ({ target, delay }) => {
  const liveReloadServer = livereload.createServer({
    delay,
  });

  liveReloadServer.watch(target);
};
