const { series, parallel, src, dest, watch } = require('gulp');
const compileSASS = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const cleanJS = require('gulp-uglify');
const concat = require('gulp-concat');


/* Watcher para SASS */
function watchSASS() {
   watch('src/scss/*.scss', compilarSASS);
}


/* Compilar SASS */
function compilarSASS() {
   return src('src/scss/slides.scss')
      .pipe(compileSASS())
      .pipe(dest('src/css/'));
}


/* Minimiar CSS y JS */
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


/* Concatenar CSS y JS */
function concatenarCSS() {
   return src('dist/css/*.css')
   .pipe(concat('index.bundle.css'))
   .pipe(dest('dist/css'));
}

function concatenarJS() {
   return src('dist/js/*.js')
   .pipe(concat('index.bundle.js'))
   .pipe(dest('dist/js'));
}

exports.limpiar = parallel(limpiarCSS, limpiarJS)
exports.concatenar = parallel(concatenarJS, concatenarCSS)

exports.default = series(compilarSASS, exports.limpiar, exports.concatenar);
exports.watchSASS = watchSASS;

