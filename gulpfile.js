const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');

gulp.task('clean', () => {
  del('build/**/*.*');
});

gulp.task('html', () =>
  gulp.src('src/index.html')
    .pipe(gulp.dest('build')));

gulp.task('styles', () =>
  gulp.src('src/styles/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('build/css')));

gulp.task('watch:styles', () => {
  gulp.watch('src/styles/**/*.*.scss', ['styles']);
});

gulp.task('default', ['clean', 'html', 'styles']);
