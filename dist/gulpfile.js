var gulp = require('gulp'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    runSequence = require('run-sequence');

gulp.task('useref', function() {
  return gulp.src('index.php')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('useref2', function() {
  return gulp.src('includes/embed/index.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist/includes/embed'))
});

gulp.task('useref3', function() {
  return gulp.src('includes/embed/index-m.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist/includes/embed'))
});

gulp.task('images', function() {
  return gulp.src('images/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/images'))
});

gulp.task('images2', function() {
  return gulp.src('includes/embed/assets/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/includes/embed/assets'))
});

gulp.task('fonts', function() {
  return gulp.src('fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});

// type 'gulp default' or just 'gulp' to run all the above
// tasks using the runSequence plugin executed below
gulp.task('default', function(callback) {
  runSequence('useref', 'useref2', 'useref3', 'images', 'images2', 'fonts', callback);
});