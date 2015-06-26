'use strict';

// Include Gulp & tools we'll use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create('wsk');
var pagespeed = require('psi');
var reload = browserSync.reload;

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

// Optimize images
gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size({title: 'images'}));
});

// Copy all files at the root level (app)
gulp.task('copy', function () {
  return gulp.src([
    'app/*',
    '!app/*.html',
    'node_modules/apache-server-configs/dist/.htaccess'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'))
    .pipe($.size({title: 'copy'}));
});

// Copy web fonts to dist
gulp.task('fonts', function () {
  return gulp.src(['app/fonts/**'])
    .pipe(gulp.dest('dist/fonts'))
    .pipe($.size({title: 'fonts'}));
});

// Compile and automatically prefix stylesheets
gulp.task('styles', function () {
// For best performance, don't add Sass partials to `gulp.src`
//  return gulp.src([
//    'app/styles/*.scss',
//    'app/styles/**/*.scss',
//    'app/styles/components/components.scss'
//  ])
  return gulp.src('app/styles/**/*.scss')
    .pipe($.sourcemaps.init({loadMaps: true}))
    //.pipe($.changed('.tmp/styles', {extension: '.css'}))
    .pipe($.sass({
      precision: 10,
      includePaths:['app/styles/']
    }))
    .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    // Concatenate and minify styles
    .pipe($.if('*.css', $.csso()))
    .pipe(gulp.dest('dist/styles'))
    .pipe($.size({title: 'styles'}));
});

// Scan your HTML for assets & optimize them
gulp.task('html', function () {
  var assets = $.useref.assets({searchPath: '{.tmp,app}'});

  return gulp.src('app/**/*.html')
    .pipe(assets)
    // Concatenate and minify JavaScript
    .pipe($.if('*.js', $.uglify({preserveComments: 'some'})))
    // Remove any unused CSS
    // Note: if not using the Style Guide, you can delete it from
    //       the next line to only include styles your project uses.
    .pipe($.if('*.css', $.uncss({
      html: [
        'app/index.html',
        'app/styleguide.html'
      ],
      // CSS Selectors for UnCSS to ignore
      ignore: [
        /.navdrawer-container.open/,
        /.app-bar.open/
      ]
    })))
    // Concatenate and minify styles
    // In case you are still using useref build blocks
    .pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    // Update production Style Guide paths
    .pipe($.replace('components/components.css', 'components/main.min.css'))
    // Minify any HTML
    .pipe($.if('*.html', $.minifyHtml()))
    // Output files
    .pipe(gulp.dest('dist'))
    .pipe($.size({title: 'html'}));
});

// Clean output directory
gulp.task('clean', del.bind(null, ['.tmp', 'dist/*', '!dist/.git'], {dot: true}));

// Watch files for changes & reload
gulp.task('serve', ['jade','styles','script-compile:dev'], function () {
  browserSync.init({
    notify: false,
    // Customize the BrowserSync console logging prefix
    logPrefix: 'WSK',
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: ['.tmp', 'app']
    //online:false
  });
  console.log('teste');

  gulp.watch(['app/**/*.{jade,md}'], ['jade', reload]);
  gulp.watch(['app/styles/**/*.{scss,css}'], ['styles', reload]);
  gulp.watch(['app/scripts/**/*.ts'], ['script-compile:dev', reload]);
  gulp.watch(['app/images/**/*'], reload);
});

// Build and serve the output from the dist build
gulp.task('serve:dist',  function () {//['default'],
  browserSync.init({
    notify: false,
    logPrefix: 'WSK',
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: 'dist'
  });
});

// Build production files, the default task
gulp.task('default', ['clean'], function (cb) {
  runSequence(['styles', 'script-compile', 'jade'], ['html', 'images', 'fonts'], 'copy', cb);
});

// Run PageSpeed Insights
gulp.task('pagespeed', function (cb) {
  // Update the below URL to the public URL of your site
  pagespeed.output('example.com', {
    strategy: 'mobile',
    // By default we use the PageSpeed Insights free (no API key) tier.
    // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
    // key: 'YOUR_API_KEY'
  }, cb);
});

// Load custom tasks from the `tasks` directory
try { require('require-dir')('tasks'); } catch (err) { console.error(err); }


