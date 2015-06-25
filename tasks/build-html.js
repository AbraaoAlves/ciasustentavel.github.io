var gulp = require('gulp');
var runSequence = require('run-sequence');
var $ = require('gulp-load-plugins')();
var jade = require('jade'); 
var DEPLOY = false;

gulp.task('jade', function(){
  
  return gulp.src('./app/index.jade')
    .pipe($.plumber())
  	.pipe($.jade({pretty: true, jade:jade}))
	  .pipe($.if(DEPLOY, $.minifyHtml()))
    .pipe(gulp.dest('./app'))
    .pipe($.size({title: 'jade'}));
});

gulp.task('jade:dist', function(done){
    DEPLOY = true;
    
    runSequence('html', function(){
      done();
      DEPLOY= false;
    })    
});

