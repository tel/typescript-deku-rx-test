'use strict';

var gulp       = require('gulp');
var browserify = require('browserify');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var gutil      = require('gulp-util');
var uglify     = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rename     = require('gulp-rename');
var tsify      = require('tsify');
var rimraf     = require('rimraf');
var watchify   = require('watchify');
var _          = require('lodash');

/**
 * Destroy the build directory.
 */
gulp.task('clean', function(cb) {
  rimraf('build', cb);
});

/**
 * Compile the frontend javascript application into a single bundle, watch for changes.
 * 
 * Uses Browserify to provide 'require' semantics in browser.
 * 
 * References
 * - https://github.com/gulpjs/gulp/blob/master/docs/recipes/browserify-transforms.md
 * - https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md
 */
(function () {
  var opts = {
    entries: './index.ts',
    debug: true
  };
  var b = 
    watchify(
      browserify(_.assign({}, watchify.args, opts))
        .plugin(tsify, { 
          noImplicitAny: true
        })
    );
    
  function bundle() {
    return b.bundle()
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(uglify())
      .on('error', gutil.log.bind(gutil, "Browserify Error"))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./build/'));
  }
  
  gulp.task('js', bundle);
  b.on('update', bundle);
  b.on('log', gutil.log);
})();
