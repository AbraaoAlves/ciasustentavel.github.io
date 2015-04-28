var gulp = require("gulp");
var replace = require("gulp-replace");

require("shelljs/global");

gulp.task("urlDev", function() {
    gulp.src("index.html", { base: './'})
	    .pipe(replace("ciasustentavel.github.io", "localhost:8080"))
	    .pipe(gulp.dest("./"));
});

gulp.task("urlProduction", function() {
    console.log("opa nenem");
    gulp.src("index.html", { base: './' })
    	.pipe(replace("localhost:8080", "ciasustentavel.github.io"))
    	.pipe(gulp.dest("./"));
});

gulp.task("set-prod", ["urlProduction"]);
gulp.task("set-dev", ["urlDev"]);

gulp.task("deploy", ["set-prod"], function  (done) {
	exec('git commit -am "[auto] change code to production"');
	exec("git push origin master");
});