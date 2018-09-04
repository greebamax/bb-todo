const fs = require('fs');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const { resolve } = require('path');
const { PATHS } = require('./helpers');

const targetFiles = [`${PATHS.SRC}/**/*.js`];
const eslintrcFile = resolve(PATHS.SRC, '.eslintrc');

const eslintRules = JSON.parse(fs.readFileSync(eslintrcFile, 'utf8'));
const eslintignoreFile = fs.readFileSync(resolve(PATHS.SRC, '.eslintignore'), 'utf8');

// convert .eslintignore into gulp.src negotiation rule
const filesToIgnore = eslintignoreFile.trim().split('\n').map(path => `!${path}`);

module.exports = () => {
  return gulp.src(targetFiles.concat(filesToIgnore))
    .pipe(eslint(eslintRules))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
};
