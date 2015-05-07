var gulp = require('gulp');

var typescript = require('gulp-typescript');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var changed = require('gulp-changed');
var gulpIf = require('gulp-if');
var runSequence = require('run-sequence');

var deploy = false;
gulp.task('lib-compile', function(){
     return gulp.src([
         'app/scripts/libs/jquery.flexslider.js'
      ])
      .pipe(changed('app/scripts/js', {extension: '.js'}))
      .pipe(gulpIf(!deploy, sourcemaps.init()))
      .pipe(concat('thirdparty.js'))
      .pipe(uglify()) 
      .pipe(gulpIf(!deploy, sourcemaps.write()))
      .pipe(gulp.dest('./app/scripts/js'));
});

gulp.task('script-compile:dev', ['lib-compile'], function() {
     var tsResult = gulp.src(['app/scripts/**/*.ts'])
        .pipe(changed('app/scripts/js', {extension: '.js'}))
        .pipe(gulpIf(!deploy, sourcemaps.init())) // This means sourcemaps will be generated 
        .pipe(typescript({
             typescript : require('typescript'),
             sortOutput : true,
             removeComments :true
         }));

      return tsResult.js
         .pipe(concat('main.js')) // You can use other plugins that also support gulp-sourcemaps
         .pipe(uglify()) 
         .pipe(gulpIf(!deploy, sourcemaps.write())) // Now the sourcemaps are added to the .js file 
         .pipe(gulp.dest('./app/scripts/js'));
});	

gulp.task('script-compile', function (done) {
      deploy = true;
      runSequence('script-compile:dev', function(){
            done();
            deploy = false;
      });
});