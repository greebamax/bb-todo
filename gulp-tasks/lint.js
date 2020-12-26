const fs = require('fs');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const { EOL } = require('os');
const { resolve } = require('path');
const { PATH } = require('./helpers.js');

const targetFiles = [`${PATH.SRC}/**/*.js`];
const eslintrcFile = resolve(PATH.ROOT, '.eslintrc');

const eslintRules = JSON.parse(fs.readFileSync(eslintrcFile, 'utf8'));
const eslintignoreFile = fs.readFileSync(resolve(PATH.ROOT, '.eslintignore'), 'utf8');

// convert .eslintignore into gulp.src negotiation rule
const filesToIgnore = eslintignoreFile.trim().split(EOL).map(path => `!${path}`);

module.exports = ({ isProd }) => {
  return gulp.src(targetFiles.concat(filesToIgnore))
    .pipe(eslint({ quiet: isProd, ...eslintRules }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
};
