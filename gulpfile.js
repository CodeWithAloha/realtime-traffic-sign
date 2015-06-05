var gulp = require('gulp');
var $ = require('gulp-load-plugins');
var bs = require('browser-sync');
var spawn = require('child_process').spawn;
var server;

gulp.task('serve', function () {
    bs.init({
      proxy: 'localhost:8080'
    });
    server && server.kill();
    server = spawn('node', ['app.js'], {stdio: 'inherit'});
});

gulp.task('default', ['serve']);
