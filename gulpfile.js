const gulp = require('gulp');
const del = require('del');
const rename = require('gulp-rename');
const { resolve, join } = require('path');

const { ENV } = require('./gulp-tasks/helpers');
const { compileCommonPartials, compileTemplates } = require('./gulp-tasks/templates');

const isProd = process.env.NODE_ENV === ENV.PROD;

const loadTask = name => {
  const path = join(__dirname, 'gulp-tasks', name);

  // eslint-disable-next-line import/no-dynamic-require,global-require
  return require(resolve(path));
};


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
  const buildStylesTask = loadTask('build-styles');

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
exports.templatesBuild = templatesBuild;
//#endregion


//#region scripts:build
const scriptsBuild = done => {
  const buildScriptsTask = loadTask('build-scripts');

  buildScriptsTask({ isProd }).then(() => done());
};
scriptsBuild.displayName = 'scripts:post-templates-build';
const scriptsBuildWithTemplates = gulp.series(templatesBuild, scriptsBuild);
scriptsBuildWithTemplates.displayName = 'scripts:build';
exports.scriptsBuildSeries = scriptsBuildWithTemplates;
//#endregion


//#region scripts:watch
const scriptsWatch = () => {
  const invokeBuild = ({ path }) => {
    switch (extname(path)) {
      case '.hbs': scriptsBuildWithTemplates(); break;
      case '.js': scriptsBuild(); break;
      default: break;
    }
  };

  return gulp.watch('src/scripts/**/*.{js,hbs}')
    .on('add', invokeBuild)
    .on('change', invokeBuild);
};
scriptsWatch.displayName = 'scripts:watch';
exports.scriptsWatch = scriptsWatch;
//#endregion


//#region watch:all
const watchAll = gulp.parallel(stylesWatch, scriptsWatch, htmlWatch);
watchAll.displayName = 'watch:all';
exports.watchAll = watchAll;
//#endregion


//#region reload
const reload = async () => {
  const reloadTask = loadTask('reload');

  reloadTask({
    target: resolve('build'),
    delay: 300, // ms
  });
};
exports.reload = reload;
//#endregion


//#region lint
const lint = () => {
  const lintTask = loadTask('lint');

  return lintTask();
};
exports.lint = lint;
//#endregion


//#region build
const build = gulp.series(
  lint,
  clean,
  htmlBuild,
  iconsBuild,
  gulp.parallel(
    stylesBuild,
    scriptsBuildWithTemplates,
  ),
);
exports.build = build;
//#endregion


//#region dev:server
const devServer = async () => {
  const devServerTask = loadTask('dev-server');

  devServerTask({
    port: 4379,
    staticFolder: resolve('build'),
  });
};
devServer.displayName = 'dev:server';
exports.server = devServer;
//#endregion


//#region dev
const dev = gulp.series(
  clean,
  iconsBuild,
  htmlBuild,
  templatesBuild,
  gulp.parallel(stylesBuild, scriptsBuildWithTemplates),
  reload,
  devServer,
  watchAll,
);
exports.dev = dev;
//#endregion


exports.default = gulp.series(dev);
