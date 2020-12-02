const gulp = require('gulp');
const del = require('del');
const rename = require('gulp-rename');
const { resolve, join, extname } = require('path');

const { ENV } = require('./gulp-tasks/helpers');

const isProd = process.env.NODE_ENV === ENV.PROD;

const loadTask = name => {
  const path = join(__dirname, 'gulp-tasks', name);

  // eslint-disable-next-line import/no-dynamic-require,global-require
  return require(resolve(path));
};

const clean = () => del([
  'build',
  'src/scripts/common/partials/index.js', // removes compiled index file of common partials
  'src/scripts/**/*.tmpl', // removes compiled hbs templates
]);
exports.clean = clean;

const htmlBuild = () => gulp.src('src/index.html').pipe(gulp.dest('build'));
exports.htmlBuild = htmlBuild;

const iconsBuild = () => gulp.src('node_modules/feather-icons/dist/feather-sprite.svg')
  .pipe(rename('icons.svg'))
  .pipe(gulp.dest('build/assets'));
exports.iconsBuild = iconsBuild;

const htmlWatch = () => gulp.watch('src/index.html', gulp.series(htmlBuild));
exports.htmlWatch = htmlWatch;

const stylesBuild = () => {
  const buildStylesTask = loadTask('build-styles');

  return buildStylesTask({ isProd });
};
exports.stylesBuild = stylesBuild;

const stylesWatch = () => gulp.watch('src/styles/**/*.scss', gulp.series(stylesBuild));
exports.stylesWatch = stylesWatch;

const scriptsBuild = done => { /* DOESN'T WORK */
  const buildScriptsTask = loadTask('build-scripts');

  buildScriptsTask({ isProd }).then(() => done());
};
exports.scriptsBuild = scriptsBuild;

const templatesBuild = done => {
  const buildTemplatesTask = loadTask('templates');

  buildTemplatesTask({ isProd }).then(() => done());
};
exports.templatesBuild = templatesBuild;

const scriptsWatch = () => {
  const invokeBuild = ({ path }) => {
    switch (extname(path)) {
      case '.hbs': gulp.series(templatesBuild, scriptsBuild); break;
      case '.js': gulp.series(scriptsBuild); break;
      default: break;
    }
  };

  return gulp.watch('src/scripts/**/*.{js,hbs}')
    .on('add', invokeBuild)
    .on('change', invokeBuild);
};
exports.scriptsWatch = scriptsWatch;

const watchAll = gulp.parallel(stylesWatch, scriptsWatch, htmlWatch);
exports.watchAll = watchAll;

const reload = () => {
  const reloadTask = loadTask('reload');

  reloadTask({
    target: resolve('build'),
  });
};
exports.reload = reload;

const lint = () => {
  const lintTask = loadTask('lint');

  return lintTask();
};
exports.lint = lint;

const build = done => {
  gulp.series(
    lint,
    clean,
    templatesBuild,
    htmlBuild,
    iconsBuild,
    gulp.parallel(
      stylesBuild,
      scriptsBuild,
    ),
  );

  done();
};
exports.build = build;

const server = () => {
  const serverTask = loadTask('server');

  serverTask({
    port: 4379,
    staticFolder: resolve('build'),
  });
};
exports.server = server;

const dev = done => {
  process.env.NODE_ENV = 'development';

  gulp.series(
    clean,
    templatesBuild,
    htmlBuild,
    iconsBuild,
    gulp.parallel(stylesBuild, scriptsBuild),
    watchAll,
    reload,
    server,
  );

  done();
};
exports.dev = dev;

exports.default = gulp.series(dev);
