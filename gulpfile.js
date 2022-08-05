var gulp = require("gulp");

//php live server
var phpConnect = require("gulp-connect-php");
var browsersync = require("browser-sync");

var paths = {
    js: "./src/share/js",
    css: "./src/share/css",
    img: "./src/share/img",
};

function gulp_watch() {
    gulp.watch(paths.js, browserSyncReload);
    gulp.watch(paths.css, browserSyncReload);
    gulp.watch(paths.img, browserSyncReload);
    gulp.watch("./**/**/*.php", browserSyncReload);
}

function connectsync() {
    phpConnect.server(
        {
            port: 8000,
            keepalive: true,
			base: './src',
        },
        function () {
            browsersync({
                proxy: "127.0.0.1:8000",
            });
        }
    );
}

function browserSyncReload(done) {
    browsersync.reload();
    done();
}

gulp.task("default", gulp.series(gulp.parallel(gulp_watch, connectsync)));
