const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const { resolve, join } = require('path');

const ENV = {
  DEV: 'development',
  PROD: 'production',
};

const loadTask = name => {
  const path = join(__dirname, 'gulp-tasks', name);

  // eslint-disable-next-line import/no-dynamic-require,global-require
  return require(resolve(path));
};

gulp.task('clean', () => {
  del('build/**/*.*');
});

gulp.task('build:html', () =>
  gulp.src('src/index.html')
    .pipe(gulp.dest('build')));

gulp.task('watch:html', () =>
  gulp.watch('src/index.html', ['build:html']));

gulp.task('build:styles', () =>
  gulp
    .src('src/styles/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('build/css')));

gulp.task('watch:styles', () => {
  gulp.watch('src/styles/**/*.scss', ['build:styles']);
});

gulp.task('build:scripts', () => {
  const buildScriptsTask = loadTask('build-scripts');

  buildScriptsTask({
    isProd: process.env.NODE_ENV === ENV.PROD,
  });
});

gulp.task('watch:scripts', () => {
  gulp.watch('src/scripts/**/*.{js,hbs}', ['build:scripts']);
});

gulp.task('watch:all', ['watch:styles', 'watch:scripts', 'watch:html']);

gulp.task('reload', () => {
  const reloadTask = loadTask('reload');

  reloadTask({
    target: resolve('build'),
  });
});

gulp.task('build', ['clean', 'build:html', 'build:styles', 'build:scripts']);

gulp.task('server', () => {
  const taskServer = loadTask('server');

  taskServer({
    port: 4379,
    staticFolder: resolve('./build'),
  });
});

gulp.task('dev', ['build', 'watch:all', 'reload', 'server']);
gulp.task('default', ['dev']);
