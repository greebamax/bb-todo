const gulp = require('gulp');
const del = require('del');
const rename = require('gulp-rename');
const { resolve, join, extname } = require('path');
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

gulp.task('styles:watch', () => gulp.watch('src/styles/**/*.scss', ['styles:build']));

gulp.task('scripts:build', done => {
  const buildScriptsTask = loadTask('build-scripts');

  buildScriptsTask({ isProd }, done);
});

gulp.task('templates:build', done => {
  const buildTemplatesTask = loadTask('templates');

  buildTemplatesTask({ isProd }, done);
});

gulp.task('scripts:watch', () => {
  const invokeBuild = ({ path }) => {
    switch (extname(path)) {
      case '.hbs': runSequence('templates:build', 'scripts:build'); break;
      case '.js': runSequence('scripts:build'); break;
      default: break;
    }
  };

  return gulp.watch('src/scripts/**/*.{js,hbs}')
    .on('add', invokeBuild)
    .on('change', invokeBuild);
});

gulp.task('watch:all', ['styles:watch', 'scripts:watch', 'html:watch']);

gulp.task('reload', () => {
  const reloadTask = loadTask('reload');

  reloadTask({
    target: resolve('build'),
  });
});

gulp.task('build',
  done => {
    runSequence(
      'lint',
      'clean',
      'templates:build',
      'html:build',
      'icons:build',
      [
        'styles:build',
        'scripts:build',
      ],
      done,
    );
  });

gulp.task('server', () => {
  const serverTask = loadTask('server');

  serverTask({
    port: 4379,
    staticFolder: resolve('build'),
  });
});

gulp.task('lint', () => {
  const lintTask = loadTask('lint');

  return lintTask();
});

gulp.task('dev', done => {
  process.env.NODE_ENV = 'development';

  runSequence('build', 'watch:all', 'reload', 'server', done);
});

gulp.task('default', ['dev']);
