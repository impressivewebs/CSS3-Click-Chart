var gulp = require('gulp'),
    del = require('del'),
    critical = require('critical'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    runSequence = require('run-sequence'),
    cachebust = require('gulp-cache-bust'),
    rename = require('gulp-rename');

gulp.task('cleanstructure', function () {
  return del('dist/**/*');
});

gulp.task('copystructure', function() {
  return gulp.src(['src/**/*']).pipe(gulp.dest('dist/'))
});

gulp.task('useref', function() {
  return gulp.src('src/index.php')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('useref2', function() {
  return gulp.src('src/includes/embed/index.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist/includes/embed'))
});

gulp.task('useref3', function() {
  return gulp.src('src/includes/embed/index-m.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist/includes/embed'))
});

gulp.task('copycss', function() {
  return gulp.src('src/css/styles.css')
   .pipe(rename('styles.max.css'))
   .pipe(gulp.dest('dist/css'));
});

gulp.task('copyjs', function() {
  return gulp.src('src/js/general.js')
   .pipe(rename('general.max.js'))
   .pipe(gulp.dest('dist/js'));
});

gulp.task('images', function() {
  return gulp.src('src/images/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/images'))
});

gulp.task('images2', function() {
  return gulp.src('src/includes/embed/assets/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/includes/embed/assets'))
});

gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});

gulp.task('cache-bust', function() {
  gulp.src('dist/index.php')
    .pipe(cachebust({
      type: 'timestamp'
    }))
    .pipe(gulp.dest('dist/'))
});

gulp.task('cache-bust2', function() {
  gulp.src('dist/includes/embed/index.html')
    .pipe(cachebust({
      type: 'timestamp'
    }))
    .pipe(gulp.dest('dist/includes/embed/'))
});

gulp.task('cache-bust3', function() {
  gulp.src('dist/includes/embed/index.m.html')
    .pipe(cachebust({
      type: 'timestamp'
    }))
    .pipe(gulp.dest('dist/includes/embed/'))
});

gulp.task('critical', function (callback) {
  critical.generate({
    inline: true,
    base: 'dist/',
    src: 'index.html',
    dest: 'css/critical.css',
    minify: true,
    width: 1600,
    height: 1000
  });
});

// type 'gulp default' or just 'gulp' to run all the above
// tasks using the runSequence plugin executed below
gulp.task('default', function(callback) {
  runSequence('cleanstructure', 'copystructure', 'useref', 'useref2', 'useref3', 'copycss', 'copyjs', 'images', 'images2', 'fonts', 'cache-bust', 'cache-bust2', 'cache-bust3', callback);
  //runSequence('cleanstructure', callback);
});