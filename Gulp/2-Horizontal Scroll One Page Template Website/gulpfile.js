const { src, dest, parallel, series, watch} = require('gulp');
const compileSASS = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const cleanJS = require('gulp-uglify');
const concat = require('gulp-concat');


function watchSASS() {
   watch('src/scss/*.scss', compilarSASS);
}

function compilarSASS() {
   return src('src/scss/slides.scss')
      .pipe(compileSASS())
      .pipe(dest('src/css/'));
}

function limpiarCSS() {
   return src('src/css/*.css')
      .pipe(cleanCSS())
      .pipe(dest('dist/css/'));
}

function limpiarJS() {
   return src('src/js/*.js')
      .pipe(cleanJS())
      .pipe(dest('dist/js/'));
}

function concatenarCSS() {
   return src('dist/css/*.css')
      .pipe(concat('index.bundle.css'))
      .pipe(dest('dist/css/'));
}

function concatenarJS() {
   return src('dist/js/*.js')
      .pipe(concat('index.bundle.js'))
      .pipe(dest('dist/js/'));
}

exports.compilarSASS = compilarSASS
exports.watchSASS = watchSASS;
exports.limpiarGeneral = parallel(limpiarCSS, limpiarJS);
exports.concatenarGeneral = parallel(concatenarCSS, concatenarJS);

exports.default = series(compilarSASS, exports.limpiarGeneral, exports.concatenarGeneral);