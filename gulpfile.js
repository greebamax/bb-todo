const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const uglify = require('rollup-plugin-uglify');
const replace = require('rollup-plugin-replace');
const handlebars = require('rollup-plugin-handlebars-plus');
const alias = require('rollup-plugin-alias');
const { resolve, join } = require('path');
const livereload = require('livereload');

const ENV = {
  DEV: 'development',
  PROD: 'production',
};
const isProd = process.env.NODE_ENV === ENV.PROD;

const loadTask = name => {
  const path = join(__dirname, 'gulptasks', name);

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
  gulp.src('src/styles/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('build/css')));

gulp.task('watch:styles', () => {
  gulp.watch('src/styles/**/*.scss', ['build:styles']);
});

gulp.task('build:scripts', async () => {
  const bundle = await rollup.rollup({
    input: 'src/scripts/main.js',
    plugins: [
      alias({
        underscore: resolve(__dirname, 'node_modules/lodash/index.js'),
      }),
      nodeResolve({
        jsnext: true,
        main: true,
        browser: true,
      }),
      commonjs({
        include: 'node_modules/**',
        sourceMap: true,
      }),
      handlebars({
        handlebars: {
          options: {
            sourceMap: !isProd,
          },
        },
        jquery: 'jquery',
      }),
      babel({
        exclude: 'node_modules/**',
      }),
      replace({
        exclude: 'node_modules/**',
        __ENV__: JSON.stringify(process.env.NODE_ENV || ENV.DEV), // `development` by default
      }),
      (isProd && uglify()),
    ],
  });

  await bundle.write({
    format: 'iife',
    sourcemap: !isProd,
    file: 'build/js/bundle.js',
  });
});

gulp.task('watch:scripts', () => {
  gulp.watch('src/scripts/**/*.js', ['build:scripts']);
});

gulp.task('watch:all', ['watch:styles', 'watch:scripts', 'watch:html']);

gulp.task('default', [
  'clean',
  'build:html',
  'build:styles',
  'build:scripts',
]);

gulp.task('reload', () => {
  const liveReloadServer = livereload.createServer({
    delay: 1000,
  });

  liveReloadServer.watch(resolve('build'));
});

gulp.task('server', loadTask('server'));
gulp.task('dev', ['default', 'watch:all', 'reload', 'server']);
