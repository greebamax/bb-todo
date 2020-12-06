import gulp from 'gulp';
import concat from 'gulp-concat';
import define from 'gulp-define-module';
import gulpHandlebars from 'gulp-handlebars';
import rename from 'gulp-rename';
import wrap from 'gulp-wrap';
import handlebars from 'handlebars';
import { PATH } from './helpers.js';

const partials = `${PATH.SRC}/scripts/common/partials/**/*.hbs`;
const templates = `${PATH.SRC}/scripts/**/*.hbs`;

//#region templates:compile-common-partials
/**
 * Compile and register common partials.
 * All partials files are expected to be placed in src/scripts/common/partials
 * and its name begins with an underscore.
 */
export const compileCommonPartials = () => gulp
  .src(partials)
  .pipe(
    gulpHandlebars({
      handlebars,
    }),
  )
  .pipe(
    wrap(
      'Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));',
      {},
      {
        imports: {
          // _templateName.js => templateName
          processPartialName: fileName => JSON.stringify(fileName.match(/[^_].*[^.js$]/g)[0]),
        },
      },
    ),
  )
  .pipe(concat('index.js'))
  .pipe(
    define('es6', {
      wrapper: false,
    }),
  )
  .pipe(gulp.dest(`${PATH.SRC}/scripts/common/partials`));
compileCommonPartials.displayName = 'templates:compile-common-partials';
//#endregion

//#region templates:compile
export const compileTemplates = () => gulp
  .src([templates, `!${partials}`])
  .pipe(
    gulpHandlebars({
      handlebars,
    }),
  )
  .pipe(define('es6'))
  .pipe(rename({ extname: '.tmpl' }))
  .pipe(gulp.dest(`${PATH.SRC}/scripts`));
compileTemplates.displayName = 'templates:compile';
//#endregion
