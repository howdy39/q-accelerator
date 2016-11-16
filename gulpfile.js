const gulp = require('gulp');
const exec = require('child_process').exec;

gulp.task('watch', () => {
  gulp.watch(['src/**/*'], ['lint', 'build']);
});

gulp.task('lint', (callback) => {
  exec(`npm run lint`, (error, stdout) => {
    console.log(stdout);
    return callback(error);
  });
});

gulp.task('build', (callback) => {
  exec(`npm run build`, (error, stdout) => {
    console.log(stdout);
    return callback(error);
  });
});

gulp.task('copy', () =>
  gulp.src(['./src/**/*', '!./src/**/*.js'])
    .pipe(gulp.dest('extension')) 
);
