'use strict'

const gulp = require('gulp');
const eslint = require('gulp-eslint');

gulp.task('lint', () => {
  return gulp
    .src(['lib/**/*.js', 'features/**/*.js', 'test/**/*.spec.js', '!lib/webspider/utilities/*'])
    .pipe(eslint())
    .pipe(eslint.format(undefined))
    .pipe(eslint.failAfterError());
});