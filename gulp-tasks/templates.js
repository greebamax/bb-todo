const gulp = require('gulp');
const concat = require('gulp-concat');
const define = require('gulp-define-module');
const gulpHandlebars = require('gulp-handlebars');
const rename = require('gulp-rename');
const wrap = require('gulp-wrap');
const handlebars = require('handlebars');
const { PATH } = require('./helpers.js');

const partials = `${PATH.SRC}/scripts/common/partials/**/*.hbs`;
const templates = `${PATH.SRC}/scripts/**/*.hbs`;

//#region templates:compile-common-partials
/**
 * Compile and register common partials.
 * All partials files are expected to be placed in src/scripts/common/partials
 * and its name begins with an underscore.
 */
const compileCommonPartials = () => gulp
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
exports.compileCommonPartials = compileCommonPartials;
//#endregion

//#region templates:compile
const compileTemplates = () => gulp
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
exports.compileTemplates = compileTemplates;
//#endregion
