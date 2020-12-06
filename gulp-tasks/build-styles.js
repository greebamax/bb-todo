import gulp from 'gulp';
import sass from 'gulp-sass';
import { join, resolve } from 'path';
import { PATH } from './helpers.js';

export default ({ isProd }) => gulp
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
