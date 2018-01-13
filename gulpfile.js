var gulp     = require( 'gulp' );
// Our plugins
var jshint = require('gulp-jshint');
var open     = require( 'gulp-open' );
var imagemin = require( 'gulp-imagemin' );
var sass     = require( 'gulp-sass' );
var cleanCSS = require( 'gulp-clean-css' );
var uglify   = require( 'gulp-uglify' );
var concat   = require('gulp-concat');

gulp.task( 'test', function() {
  return gulp.src( 'test/SpecRunner.html' )
    .pipe( open() );
});

gulp.task( 'html', function() {
  return gulp.src( 'working/*.html' )
    .pipe( gulp.dest( 'final/' ) );
});

gulp.task( 'image', function() {
  return gulp.src( 'working/assets/*' )
    .pipe( gulp.dest( 'final/assets/' ) );
});

// Compile SASS
gulp.task( 'sass', function() {
  return gulp.src( 'working/sass/style.sass' )
    .pipe( sass() )
    .pipe( gulp.dest( 'final/' ) );
});

gulp.task( 'build:sass', function() {
  return gulp.src( 'working/sass/style.sass' )
    .pipe( sass() )
    .pipe( cleanCSS() )
    .pipe( gulp.dest( 'final/' ) );
});

//Compile JS
gulp.task('scripts', function() {
  return gulp.src(['working/js/jquery.js', 'working/js/jquery-ui.min.js', 'working/js/jquery.ui.touch-punch.min.js', 'working/js/video.js', 'working/js/videojs-replay.min.js', 'working/js/*.js', 'working/js/interaction.js'])
    .pipe(concat('default.js'))
    .pipe( uglify() )
    .pipe(gulp.dest('final/'));
});

gulp.task( 'default', [ 'sass', 'scripts', 'html', 'image' ] );

gulp.task( 'watch', function() {
  gulp.watch( [ 'working/sass/*.sass', 'working/js/*.js', 'working/*.html', 'working/assets/*.svg' ], [ 'default' ] );
});

gulp.task( 'build:final', [ 'build:sass', 'html', 'image', 'scripts' ] );

