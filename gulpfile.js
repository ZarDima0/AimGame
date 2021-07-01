const { src, dest, watch, parallel } = require("gulp");

const scss = require("gulp-sass");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");

function browsersync() {
  browserSync.init({
    server: { baseDir: "app/" },
  });
}

function styles() {
  return src("app/scss/style.scss")
    .pipe(scss({ outputStyle: "compressed" }))
    .pipe(concat("style.min.css"))
    .pipe(
      autoprefixer({ overrideBrowserslist: ["last 10 version"], grid: true })
    )
    .pipe(dest("app/css"))
    .pipe(browserSync.stream());
}

function build() {
  return src(["app/css/style/min.css", "app/*.html"], { base: "app" }).pipe(
    dest("dist")
  );
}
function watching() {
  watch(["app/scss/**/*.scss"], styles);
  watch(["app/*.html"]).on("change", browserSync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;

exports.default = parallel(browsersync, watching, styles);
