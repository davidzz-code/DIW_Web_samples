const { src, dest, series, parallel } = require('gulp');
const compileSASS = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const cleanJS = require('gulp-uglify');
const concat = require('gulp-concat');


function compilarSASS() {
   return src('src/scss/slides.scss')
      .pipe(compileSASS())
      .pipe(dest('src/css'));
}

function limpiarCSS() {
   return src('src/css/*.css')
   .pipe(cleanCSS())
   .pipe(dest('dist/css'));
}

function limpiarJS() {
   return src('src/js/*.js')
   .pipe(cleanJS())
   .pipe(dest('dist/js'));
}

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

exports.default =
   series(
      compilarSASS,
      parallel(limpiarCSS, limpiarJS),
      parallel(concatenarCSS, concatenarJS)
   );