import fs from 'fs';
import gulp from 'gulp';
import eslint from 'gulp-eslint';
import { EOL } from 'os';
import { resolve } from 'path';
import { PATH } from './helpers.js';

const targetFiles = [`${PATH.SRC}/**/*.js`];
const eslintrcFile = resolve(PATH.SRC, '.eslintrc');

const eslintRules = JSON.parse(fs.readFileSync(eslintrcFile, 'utf8'));
const eslintignoreFile = fs.readFileSync(resolve(PATH.SRC, '.eslintignore'), 'utf8');

// convert .eslintignore into gulp.src negotiation rule
const filesToIgnore = eslintignoreFile.trim().split(EOL).map(path => `!${path}`);

export default ({ isProd }) => {
  return gulp.src(targetFiles.concat(filesToIgnore))
    .pipe(eslint({ quiet: isProd, ...eslintRules }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
};
