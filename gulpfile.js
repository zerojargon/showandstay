var gulp = require('gulp'),
	watchLess = require('gulp-watch-less'),
	less = require('gulp-less');

gulp.task('default', function () {
  return gulp.src('./assets/less/app.less')
    .pipe(less())
    .pipe(gulp.dest('./assets/css'));
});