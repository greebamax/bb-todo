const gulp = require('gulp');
const del = require('del');
const rename = require('gulp-rename');
const { resolve, join } = require('path');
const runSequence = require('run-sequence');

const { ENV } = require('./gulp-tasks/helpers');

const isProd = process.env.NODE_ENV === ENV.PROD;

const loadTask = name => {
  const path = join(__dirname, 'gulp-tasks', name);

  // eslint-disable-next-line import/no-dynamic-require,global-require
  return require(resolve(path));
};

gulp.task('clean',
  () => del([
    'build',
    'src/scripts/common/partials/index.js', // removes compiled index file of common partials
    'src/scripts/**/*.tmpl', // removes compiled hbs templates
  ]));

gulp.task('html:build', () => gulp.src('src/index.html').pipe(gulp.dest('build')));

gulp.task('icons:build',
  () => gulp.src('node_modules/feather-icons/dist/feather-sprite.svg')
    .pipe(rename('icons.svg'))
    .pipe(gulp.dest('build/assets')));

gulp.task('html:watch', () => gulp.watch('src/index.html', ['html:build']));

gulp.task('styles:build', () => {
  const buildStylesTask = loadTask('build-styles');

  return buildStylesTask({ isProd });
});

gulp.task('styles:watch', () => {
  gulp.watch('src/styles/**/*.scss', ['styles:build']);
});

gulp.task('scripts:build', callback => {
  const buildScriptsTask = loadTask('build-scripts');

  buildScriptsTask({ isProd }, callback);
});

gulp.task('templates:build', callback => {
  const buildTemplatesTask = loadTask('templates');

  buildTemplatesTask({ isProd }, callback);
});

gulp.task('scripts:watch', () => {
  gulp.watch('src/scripts/**/*.{js,hbs}', ['scripts:build']);
});

gulp.task('watch:all', ['styles:watch', 'scripts:watch', 'html:watch']);

gulp.task('reload', () => {
  const reloadTask = loadTask('reload');

  reloadTask({
    target: resolve('build'),
  });
});

gulp.task('build',
  callback => {
    runSequence(
      'clean',
      'templates:build',
      'html:build',
      'icons:build',
      [
        'styles:build',
        'scripts:build',
      ],
      callback,
    );
  });

gulp.task('server', () => {
  const serverTask = loadTask('server');

  serverTask({
    port: 4379,
    staticFolder: resolve('build'),
  });
});

gulp.task('dev', done => {
  process.env.NODE_ENV = 'development';

  runSequence('build', 'watch:all', 'reload', 'server', done);
});

gulp.task('default', ['dev']);
