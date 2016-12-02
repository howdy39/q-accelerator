const gulp = require('gulp');
const exec = require('child_process').exec;

gulp.task('watch', () => {
  gulp.watch(['src/**/*'], ['build']);
});

gulp.task('build', (callback) => {
  exec('npm run build', (error, stdout) => {
    console.log(stdout);
    return callback(error);
  });
});
