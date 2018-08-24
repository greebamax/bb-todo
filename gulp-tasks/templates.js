const path = require('path');
const gulp = require('gulp');
const wrap = require('gulp-wrap');
const define = require('gulp-define-module');
const concat = require('gulp-concat');
const handlebars = require('gulp-handlebars');
const debug = require('gulp-debug');
const rename = require('gulp-rename');

/**
 * Assume all partials start with an underscore.
 * Common hbs partials placed in src/scripts/common/partials.
 */
module.exports = (/* TODO: { isProd } */) => {
  // Compile and register common partials
  gulp
    .src(['src/scripts/common/partials/**/*.hbs'])
    .pipe(debug())
    .pipe(handlebars())
    .pipe(
      wrap(
        'Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));',
        {},
        {
          imports: {
            processPartialName(fileName) {
              // Strip the extension and the underscore
              // Escape the output with JSON.stringify
              return JSON.stringify(path.basename(fileName, '.js').substr(1));
            },
          },
        },
      ),
    )
    .pipe(concat('templates.js'))
    .pipe(define('es6', {
      wrapper: false,
    }))
    .pipe(gulp.dest('src/scripts/common/partials'));

  // Compile templates
  gulp
    .src(['src/scripts/**/*.hbs', '!src/scripts/common/partials/**/*.hbs'])
    .pipe(debug())
    .pipe(handlebars())
    .pipe(define('es6'))
    .pipe(rename({ suffix: '.hbs' }))
    .pipe(gulp.dest('src/scripts'));
};
