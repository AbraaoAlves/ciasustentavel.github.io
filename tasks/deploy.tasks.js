var gulp = require("gulp");
var replace = require("gulp-replace");

require("shelljs/global");

gulp.task("urlDev", function() {
    gulp.src("index.html", { base: './'})
	    .pipe(replace("ciasustentavel.com.br", "localhost:8080"))
	    .pipe(gulp.dest("./"));
});

gulp.task("urlProduction", function() {
    console.log("opa nenem");
    gulp.src("index.html", { base: './' })
    	.pipe(replace("localhost:8080", "ciasustentavel.com.br"))
    	.pipe(gulp.dest("./"));
});

gulp.task("set-prod", ["urlProduction"]);
gulp.task("set-dev", ["urlDev"]);

gulp.task("deploy", ["set-prod"], function  (done) {
	
	exec("git add . --all ");
	exec("git commit -am '[deploy] Auto-commit'");

	var res = exec("git push origin master");
	
	if(res.code !== 0) {
		echo("deploy failed. ");
		exit(1);
	}	
});