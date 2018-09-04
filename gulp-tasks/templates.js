const concat = require('gulp-concat');
const define = require('gulp-define-module');
const gulp = require('gulp');
const gulpHandlebars = require('gulp-handlebars');
const handlebars = require('handlebars');
const merge = require('gulp-merge');
const rename = require('gulp-rename');
const wrap = require('gulp-wrap');

const { PATH } = require('./helpers');

/**
 * Assume all partials start with an underscore.
 * Common hbs partials should be placed in src/scripts/common/partials.
 */
module.exports = () => {
  const partials = `${PATH.SRC}/scripts/common/partials/**/*.hbs`;
  const templates = `${PATH.SRC}/scripts/**/*.hbs`;

  // Compile and register common partials
  const compileCommons = gulp
    .src(partials)
    .pipe(gulpHandlebars({
      handlebars,
    }))
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
    .pipe(define('es6', {
      wrapper: false,
    }))
    .pipe(gulp.dest(`${PATH.SRC}/scripts/common/partials`));

  // Compile templates
  const compileTemplates = gulp
    .src([templates, `!${partials}`])
    .pipe(gulpHandlebars({
      handlebars,
    }))
    .pipe(define('es6'))
    .pipe(rename({ extname: '.tmpl' }))
    .pipe(gulp.dest(`${PATH.SRC}/scripts`));

  return new Promise((resolve, reject) => {
    merge(compileCommons, compileTemplates)
      .on('error', () => reject())
      .on('end', () => resolve());
  });
};
