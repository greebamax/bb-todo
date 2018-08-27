const gulp = require('gulp');
const sass = require('gulp-sass');
const { resolve } = require('path');

module.exports = ({ isProd }) => gulp
  .src('src/styles/main.scss')
  .pipe(
    sass({
      includePaths: [resolve('src/styles'), resolve('node_modules')],
      outputStyle: isProd ? 'compressed' : 'expanded',
      sourceMap: !isProd,
    }),
  )
  .pipe(gulp.dest('build/css'));
