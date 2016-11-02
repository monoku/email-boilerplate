'use strict'

const gulp           = require('gulp')
const sass           = require('gulp-sass')
const imagePath      = require('gulp-inline-image-path')
const inlineCss      = require('gulp-inline-css')
const nunjucksRender = require('gulp-nunjucks-render')
const data           = require('gulp-data')
const browserSync    = require('browser-sync').create()
const requireReload  = require('require-reload')(require)
const replace        = require('gulp-replace')
const reload         = browserSync.reload

gulp.task('server', ['img', 'sass', 'nunjucks'], function() {
  browserSync.init({
    server: {
      baseDir: './dist',
      directory: true
    }
  })
})

gulp.task('sass', function() {
  return gulp.src('src/sass/*.+(scss|sass)')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream())
})

gulp.task('img', function() {
  return gulp.src('src/img/**/*')
    .pipe(gulp.dest('dist/img/'))
})

gulp.task('img-reload', ['img'], function(done) {
  browserSync.reload()
  done()
})

gulp.task('nunjucks', function() {
  return gulp.src('src/templates/*.njk')
    .pipe(data(function() {
      return requireReload('./src/data.json')
    }))
    .pipe(nunjucksRender({
      path: ['src/templates']
    }))
    .pipe(gulp.dest('dist'))
})

gulp.task('nunjucks-dist', function() {
  return gulp.src('src/templates/*.njk')
    .pipe(nunjucksRender({
      path: ['src/templates'],
      envOptions: {
        tags: {
          variableStart: '<<$',
          variableEnd: '$>>'
        }
      }
    }))
    .pipe(replace(/{{([^}\s]+)\s?\|\s?safe}}/gm, '{{{$1}}}'))
    .pipe(gulp.dest('dist'))
})

gulp.task('nunjucks-reload', ['nunjucks'], function(done) {
  browserSync.reload()
  done()
})

gulp.task('watch', function(){
  gulp.watch(['src/templates/**/*.njk', 'src/data.json'], ['nunjucks-reload'])
  gulp.watch('src/img/**/*', ['img-reload'])
  gulp.watch('src/sass/**/*.+(scss|sass)', ['sass'])
})

gulp.task('default', ['watch', 'server'])

gulp.task('dist', ['sass', 'nunjucks-dist'], function() {
  return gulp.src('dist/*.html')
    .pipe(inlineCss())
    .pipe(gulp.dest('dist/inline/'));
})