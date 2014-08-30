var gulp = require('gulp'),
  source = require('vinyl-source-stream'),
  browserify = require('browserify'),
  connect = require('gulp-connect-multi')();

  //$ = require('gulp-load-plugins')();

// Scripts
gulp.task('scripts', function () {
    return  browserify({
      entries: ['./app/js/main.jsx'],
      debug: true
    })

    .on('error', function(log) {
      console.log(log);
    })
    .bundle()
    .on('error', function(log) {
      console.log(log);
    })
    .pipe(source('app.js'))
    // .pipe($.jshint('.jshintrc'))
    // .pipe($.jshint.reporter('default'))
    .pipe(gulp.dest('app/js'))

    .pipe(connect.reload())

    //.on('error', $.util.beep);
});


//styles
gulp.task('styles', function() {
  //for now just reload the server
  connect.reload();
});

// Connect
gulp.task('connect', connect.server({
    root: ['app'],
    port: 9003,
    livereload: true,
    open:{
    browser:  'Google Chrome' //'chrome'
  }
}));

gulp.task('watch', ['scripts', 'connect'], function () {
    gulp.watch(['app/js/**/*.js','app/js/**/*.jsx','!app/js/app.js'], ['scripts']);
    gulp.watch(['app/css/**.css'], ['styles']);
});

gulp.task('default', ['watch']);
