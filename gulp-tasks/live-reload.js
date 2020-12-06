import livereload from 'livereload';

export default ({ target, delay }) => {
  const liveReloadServer = livereload.createServer({
    delay,
  });

  liveReloadServer.watch(target);
};
