const gulp = require('gulp');

gulp.task('copy', () =>
  gulp.src(['./src/**/*', '!./src/**/*.js'])
    .pipe(gulp.dest('extension')) 
);