const gulp = require('gulp');
const sass = require('gulp-sass');
const { resolve, join } = require('path');
const { PATH } = require('./helpers');

module.exports = ({ isProd }) => gulp
  .src(join(PATH.SRC, 'styles', 'main.scss'))
  .pipe(
    sass({
      includePaths: [
        resolve(join(PATH.SRC, 'styles')),
        resolve(join(PATH.ROOT, 'node_modules')),
      ],
      outputStyle: isProd ? 'compressed' : 'expanded',
      sourceMap: !isProd,
    }),
  )
  .pipe(gulp.dest(join(PATH.DEST, 'css')));
