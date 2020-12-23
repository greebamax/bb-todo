const gulp = require('gulp');
const del = require('del');
const rename = require('gulp-rename');
const { resolve } = require('path');

const { ENV } = require('./gulp-tasks/helpers.js');
const buildStylesTask = require('./gulp-tasks/build-styles.js');
const buildScriptsTask = require('./gulp-tasks/build-scripts.js');
const devServerTask = require('./gulp-tasks/dev-server.js');
const lintTask = require('./gulp-tasks/lint.js');
const liveReloadTask = require('./gulp-tasks/live-reload.js');
const { compileCommonPartials, compileTemplates } = require('./gulp-tasks/templates.js');
const testTask = require('./gulp-tasks/tests.js');

const isProd = process.env.NODE_ENV === ENV.PROD;

//#region clean
const clean = () => del([
  'build',
  'src/scripts/common/partials/index.js', // removes compiled index file of common partials
  'src/scripts/**/*.tmpl', // removes compiled hbs templates
]);
exports.clean = clean;
//#endregion

//#region html:build
const htmlBuild = () => gulp.src('src/index.html').pipe(gulp.dest('build'));
htmlBuild.displayName = 'html:build';
exports.htmlBuild = htmlBuild;
//#endregion

//#region icons:build
const iconsBuild = () => gulp.src('node_modules/feather-icons/dist/feather-sprite.svg')
  .pipe(rename('icons.svg'))
  .pipe(gulp.dest('build/assets'));
iconsBuild.displayName = 'icons:build';
exports.iconsBuild = iconsBuild;
//#endregion

//#region html:watch
const htmlWatch = () => gulp.watch('src/index.html', gulp.series(htmlBuild));
htmlWatch.displayName = 'html:watch';
exports.htmlWatch = htmlWatch;
//#endregion

//#region styles:build
const stylesBuild = () => {
  return buildStylesTask({ isProd });
};
stylesBuild.displayName = 'styles:build';
exports.stylesBuild = stylesBuild;
//#endregion

//#region styles:watch
const stylesWatch = () => gulp.watch('src/styles/**/*.scss', gulp.series(stylesBuild));
stylesWatch.displayName = 'styles:watch';
exports.stylesWatch = stylesWatch;
//#endregion

//#region templates:build
const templatesBuild = gulp.series(compileCommonPartials, compileTemplates);
templatesBuild.displayName = 'templates:build';
//#endregion

//#region scripts:build-js|build-all
const scriptsBuild = async done => {
  return buildScriptsTask({ isProd }).then(() => done());
};
scriptsBuild.displayName = 'scripts:build-js';
exports.scriptsBuild = scriptsBuild;

const scriptsBuildWithTemplates = gulp.series(templatesBuild, scriptsBuild);
scriptsBuildWithTemplates.displayName = 'scripts:build-all';
exports.scriptsBuildWithTemplates = scriptsBuildWithTemplates;
//#endregion

//#region scripts:watch
const scriptsWatch = () => gulp.watch(['src/scripts/**/*.js', '!src/scripts/common/partials/index.js'], gulp.series(scriptsBuild));
scriptsWatch.displayName = 'scripts:watch';
exports.scriptsWatch = scriptsWatch;
//#endregion

//#region templates:watch
const templatesWatch = () => gulp.watch('src/scripts/**/*.hbs', gulp.series(templatesBuild, scriptsBuild));
templatesWatch.displayName = 'templates:watch';
exports.templatesWatch = templatesWatch;
//#endregion

//#region watch:all
const watchAll = gulp.parallel(htmlWatch, stylesWatch, templatesWatch, scriptsWatch);
watchAll.displayName = 'watch:all';
exports.watchAll = watchAll;
//#endregion

//#region reload
const reload = async () => {
  liveReloadTask({
    target: resolve('build'),
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
  scriptsBuildWithTemplates,
);
exports.build = build;
//#endregion

//#region dev:server
const devServer = async () => {
  devServerTask({
    port: 4379,
    staticFolder: resolve('build'),
  });
};
devServer.displayName = 'dev:server';
exports.devServer = devServer;
//#endregion

//#region dev
const dev = gulp.series(
  build,
  reload,
  devServer,
  watchAll,
);
exports.dev = dev;
//#endregion

exports.default = gulp.series(dev);
