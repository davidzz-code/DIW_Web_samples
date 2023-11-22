const { src, dest, series, parallel, watch } = require('gulp');
const cleanSASS = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const cleanJS = require('gulp-uglify');
const cleanHTML = require('gulp-htmlmin');
const concat = require('gulp-concat');

// El watcher de SASS que vigila los cambios y ejecuta la función de minimizar el SASS
function watcherSASS() {
   watch('src/scss/*.scss', minimizarSASS);
}

/**
 * Minimiza SASS, CSS, JS Y HTML y los mueve a la carpeta DIST
 */
function minimizarSASS() {
   return src('src/sass/*.scss')
      .pipe(cleanSASS())
      .pipe(dest('src/css/'));
}

function minimizarCSS() {
   return src('src/css/*.css')
   .pipe(cleanCSS())
   .pipe(dest('dist/css/'));
}

function minimizarJS() {
   return src('src/js/*.js')
   .pipe(cleanJS())
   .pipe(dest('dist/js/'));
}

function minimizarHTML() {
   return src('src/*.html')
      .pipe(cleanHTML({ collapseWhitespace: true }))
      .pipe(dest('dist/'));
}

/**
 * Concatena CSS, JS y los junta en un solo archivo para cada lenguaje
 */
function concatenarCSS() {
   return src('dist/css/*.css')
      .pipe(concat('all.css'))
      .pipe(dest('dist/css/'));
}

function concatenarJS() {
   return src('dist/js/*.js')
      .pipe(concat('all.js'))
      .pipe(dest('dist/js/'));
}


exports.watcherSASS = watcherSASS;
exports.minimizarGeneral = parallel(minimizarCSS, minimizarJS);
exports.default = series(minimizarSASS, exports.minimizarGeneral, concatenarCSS, concatenarJS)


