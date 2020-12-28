const gulp = require("gulp");
const sass = require("gulp-sass");
const { join, resolve } = require("path");
const { PATH } = require("./helpers.js");

module.exports = ({ isProd }) =>
  gulp
    .src(join(PATH.SRC, "styles", "main.scss"))
    .pipe(
      sass({
        includePaths: [
          resolve(join(PATH.SRC, "styles")),
          resolve(join(PATH.ROOT, "node_modules")),
        ],
        outputStyle: isProd ? "compressed" : "expanded",
        sourceMap: !isProd,
      })
    )
    .pipe(gulp.dest(join(PATH.DEST, "css")));
