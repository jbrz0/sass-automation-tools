var gulp = require('gulp'),
  gutil = require('gulp-util'),
  webserver = require('gulp-webserver');
  sass = require('gulp-sass');

gulp.task('js', function() {
  gulp.src('app/js/**/*');
});

gulp.task('html', function() {
  gulp.src('app/*.html');
});

gulp.task('css', function() {
  gulp.src('app/css/*.css');
});

gulp.task('watch', function() {
  gulp.watch('app/js/**/*', ['js']);
  gulp.watch('app/css/*.css', ['css']);
  gulp.watch(['app/*.html',
    'app/views/*.html'], ['html']);
});

gulp.task('webserver', function() {
  gulp.src('app/')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

var input = 'app/stylesheets/style.scss';
var output = 'app/css';

gulp.task('sass', function () {
  return gulp
    .src(input)
    .pipe(sass())
    .pipe(gulp.dest(output));
});

gulp.task('watch', function() {
  return gulp
    .watch(input, ['sass'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('default', ['watch', 'html', 'js', 'css', 'webserver', 'sass', 'watch']);
