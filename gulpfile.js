const gulp = require('gulp');
const del = require('del');
const { resolve, join } = require('path');
const { ENV } = require('./gulp-tasks/helpers');

const isProd = process.env.NODE_ENV === ENV.PROD;

const loadTask = name => {
  const path = join(__dirname, 'gulp-tasks', name);

  // eslint-disable-next-line import/no-dynamic-require,global-require
  return require(resolve(path));
};

gulp.task('clean', () => {
  del('build/**/*.*');
});

gulp.task('html:build', () =>
  gulp.src('src/index.html')
    .pipe(gulp.dest('build')));

gulp.task('html:watch', () =>
  gulp.watch('src/index.html', ['html:build']));

gulp.task('styles:build', () => {
  const buildStylesTask = loadTask('build-styles');

  buildStylesTask({ isProd });
});

gulp.task('styles:watch', () => {
  gulp.watch('src/styles/**/*.scss', ['styles:build']);
});

gulp.task('scripts:build', () => {
  const buildScriptsTask = loadTask('build-scripts');

  buildScriptsTask({
    isProd,
  });
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

gulp.task('build', ['clean', 'html:build', 'styles:build', 'scripts:build']);

gulp.task('server', () => {
  const taskServer = loadTask('server');

  taskServer({
    port: 4379,
    staticFolder: resolve('./build'),
  });
});

gulp.task('dev', ['build', 'watch:all', 'reload', 'server']);
gulp.task('default', ['dev']);
