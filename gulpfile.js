const gulp = require("gulp");
const del = require("del");
const rename = require("gulp-rename");
const { resolve } = require("path");

const { ENV } = require("./gulp-tasks/helpers.js");
const buildStylesTask = require("./gulp-tasks/build-styles.js");
const { buildScripts, watchScripts } = require("./gulp-tasks/build-scripts.js");
const devServerTask = require("./gulp-tasks/dev-server.js");
const lintTask = require("./gulp-tasks/lint.js");
const liveReloadTask = require("./gulp-tasks/live-reload.js");
const {
  compileCommonPartials,
  compileTemplates,
} = require("./gulp-tasks/templates.js");

const isProd = process.env.NODE_ENV === ENV.PROD;

//#region clean
const clean = () =>
  del([
    "build",
    "src/scripts/common/partials/index.js", // removes compiled index file of common partials
    "src/scripts/**/*.tmpl", // removes compiled hbs templates
  ]);
exports.clean = clean;
//#endregion

//#region html:build
const htmlBuild = () => gulp.src("src/index.html").pipe(gulp.dest("build"));
exports.htmlBuild = htmlBuild;
//#endregion

//#region icons:build
const iconsBuild = () =>
  gulp
    .src("node_modules/feather-icons/dist/feather-sprite.svg")
    .pipe(rename("icons.svg"))
    .pipe(gulp.dest("build/assets"));
exports.iconsBuild = iconsBuild;
//#endregion

//#region html:watch
const htmlWatch = () => gulp.watch("src/index.html", gulp.series(htmlBuild));
exports.htmlWatch = htmlWatch;
//#endregion

//#region styles:build
const stylesBuild = () => buildStylesTask({ isProd });
exports.stylesBuild = stylesBuild;
//#endregion

//#region styles:watch
const stylesWatch = () =>
  gulp.watch("src/styles/**/*.scss", gulp.series(stylesBuild));
exports.stylesWatch = stylesWatch;
//#endregion

//#region templates:build
const templatesBuild = gulp.series(compileCommonPartials, compileTemplates);
exports.templatesBuild = templatesBuild;
//#endregion

//#region scripts:build-js|build-all
const scriptsBuild = async (done) => {
  try {
    await buildScripts({ isProd });
  } catch (err) {
    console.error(err); // eslint-disable-line
  } finally {
    done();
  }
};
exports.scriptsBuild = scriptsBuild;

const scriptsBuildWithTemplates = gulp.series(templatesBuild, scriptsBuild);
exports.scriptsBuildWithTemplates = scriptsBuildWithTemplates;
//#endregion

//#region scripts:watch
const scriptsWatch = async (done) => {
  try {
    await watchScripts();
  } catch (err) {
    console.error(err); // eslint-disable-line
  } finally {
    done();
  }
};
exports.scriptsWatch = scriptsWatch;
//#endregion

//#region templates:watch
const partialsWatch = () =>
  gulp.watch(
    "src/scripts/common/partials/**/*.hbs",
    gulp.series(compileCommonPartials)
  );
const templatesWatch = () =>
  gulp.watch(
    ["src/scripts/**/*.hbs", "!src/scripts/common/partials/**/*.hbs"],
    gulp.series(compileTemplates)
  );
const watchAllTemplates = gulp.parallel(partialsWatch, templatesWatch);
exports.watchAllTemplates = watchAllTemplates;
//#endregion

//#region watch:all
const watchAll = gulp.parallel(
  htmlWatch,
  stylesWatch,
  watchAllTemplates,
  scriptsWatch
);
exports.watchAll = watchAll;
//#endregion

//#region reload
const reload = async () => {
  liveReloadTask({
    target: resolve("build"),
    delay: 300, // ms
  });
};
exports.reload = reload;
//#endregion

//#region lint
const lint = () => lintTask({ isProd });
exports.lint = lint;
//#endregion

//#region build
const build = gulp.series(
  lint,
  clean,
  htmlBuild,
  iconsBuild,
  stylesBuild,
  templatesBuild
);
exports.build = build;
//#endregion

//#region dev:server
const devServer = async () => {
  devServerTask({
    port: 4379,
    staticFolder: resolve("build"),
  });
};
exports.devServer = devServer;
//#endregion

//#region dev
const dev = gulp.series(build, reload, devServer, watchAll);
exports.dev = dev;
//#endregion

exports.default = gulp.series(dev);
