import gulp from 'gulp';
import del from 'del';
import rename from 'gulp-rename';
import { resolve } from 'path';

import { ENV } from './gulp-tasks/helpers.js';
import buildStylesTask from './gulp-tasks/build-styles.js';
import buildScriptsTask from './gulp-tasks/build-scripts.js';
import devServerTask from './gulp-tasks/dev-server.js';
import lintTask from './gulp-tasks/lint.js';
import liveReloadTask from './gulp-tasks/live-reload.js';
import { compileCommonPartials, compileTemplates } from './gulp-tasks/templates.js';

const isProd = process.env.NODE_ENV === ENV.PROD;

//#region clean
export const clean = () => del([
  'build',
  'src/scripts/common/partials/index.js', // removes compiled index file of common partials
  'src/scripts/**/*.tmpl', // removes compiled hbs templates
]);
//#endregion

//#region html:build
export const htmlBuild = () => gulp.src('src/index.html').pipe(gulp.dest('build'));
htmlBuild.displayName = 'html:build';
//#endregion

//#region icons:build
export const iconsBuild = () => gulp.src('node_modules/feather-icons/dist/feather-sprite.svg')
  .pipe(rename('icons.svg'))
  .pipe(gulp.dest('build/assets'));
iconsBuild.displayName = 'icons:build';
//#endregion

//#region html:watch
export const htmlWatch = () => gulp.watch('src/index.html', gulp.series(htmlBuild));
htmlWatch.displayName = 'html:watch';
//#endregion

//#region styles:build
export const stylesBuild = () => {
  return buildStylesTask({ isProd });
};
stylesBuild.displayName = 'styles:build';
//#endregion

//#region styles:watch
const stylesWatch = () => gulp.watch('src/styles/**/*.scss', gulp.series(stylesBuild));
stylesWatch.displayName = 'styles:watch';
//#endregion

//#region templates:build
export const templatesBuild = gulp.series(compileCommonPartials, compileTemplates);
templatesBuild.displayName = 'templates:build';
//#endregion

//#region scripts:build-js|build-all
export const scriptsBuild = async done => {
  return buildScriptsTask({ isProd }).then(() => done());
};
scriptsBuild.displayName = 'scripts:build-js';

export const scriptsBuildWithTemplates = gulp.series(templatesBuild, scriptsBuild);
scriptsBuildWithTemplates.displayName = 'scripts:build-all';
//#endregion

//#region scripts:watch
export const scriptsWatch = () => gulp.watch(['src/scripts/**/*.js', '!src/scripts/common/partials/index.js'], gulp.series(scriptsBuild));
scriptsWatch.displayName = 'scripts:watch';
//#endregion

//#region templates:watch
export const templatesWatch = () => gulp.watch('src/scripts/**/*.hbs', gulp.series(templatesBuild, scriptsBuild));
templatesWatch.displayName = 'templates:watch';
//#endregion

//#region watch:all
export const watchAll = gulp.parallel(htmlWatch, stylesWatch, templatesWatch, scriptsWatch);
watchAll.displayName = 'watch:all';
//#endregion

//#region reload
export const liveReload = async () => {
  liveReloadTask({
    target: resolve('build'),
    delay: 300, // ms
  });
};
//#endregion

//#region lint
export const lint = () => lintTask({ isProd });
//#endregion

//#region build
export const build = gulp.series(
  lint,
  clean,
  htmlBuild,
  iconsBuild,
  stylesBuild,
  scriptsBuildWithTemplates,
);
//#endregion

//#region dev:server
export const devServer = async () => {
  devServerTask({
    port: 4379,
    staticFolder: resolve('build'),
  });
};
devServer.displayName = 'dev:server';
//#endregion

//#region dev
export const dev = gulp.series(
  build,
  liveReload,
  devServer,
  watchAll,
);
//#endregion

export default gulp.series(dev);
