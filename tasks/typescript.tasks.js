var gulp = require('gulp');
var runSequence = require('run-sequence');

var typescript = require('gulp-typescript');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var changed = require('gulp-changed');
var gulpIf = require('gulp-if');

var deploy = false;
gulp.task('lib-compile', function(){
     return gulp.src([
         'app/scripts/libs/*.js'
      ])
      .pipe(changed('app/scripts/js', {extension: '.js'}))
      .pipe(gulpIf(!deploy, sourcemaps.init({loadMaps: true})))
      .pipe(concat('thirdparty.js'))
      .pipe(gulpIf(deploy, uglify({preserveComments: 'some'}))) 
      .pipe(gulpIf(!deploy, sourcemaps.write('./')))
      .pipe(gulp.dest(deploy ? 'dist/scripts/js':'./app/scripts/js'));
});

gulp.task('script-compile:dev', ['lib-compile'], function() {
     var tsResult = gulp.src('app/scripts/**/*.ts')
        .pipe(changed('app/scripts/js', {extension: '.js'}))
        .pipe(gulpIf(!deploy, sourcemaps.init({loadMaps: true}))) // This means sourcemaps will be generated 
        .pipe(typescript({
             typescript : require('typescript'),
             sortOutput : true
         }));

      return tsResult.js
         .pipe(concat('main.js')) // You can use other plugins that also support gulp-sourcemaps
         .pipe(gulpIf(deploy, uglify()))
         .pipe(gulpIf(!deploy, sourcemaps.write('./')))  
         .pipe(gulp.dest(deploy ? 'dist/scripts/js':'./app/scripts/js'));
});	

gulp.task('script-compile', function (done) {
      deploy = true;
      runSequence('script-compile:dev', function(){
            done();
            deploy = false;
      });
});