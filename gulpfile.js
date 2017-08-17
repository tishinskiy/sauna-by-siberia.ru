'use strict';

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const csso = require('gulp-csso');
const mainBowerFiles = require('main-bower-files');
const concat = require('gulp-concat');
const pug = require('gulp-pug');
const del = require('del');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const browserSync  = require('browser-sync').create();
const notify = require( 'gulp-notify' );
const newer = require('gulp-newer');
const remember = require('gulp-remember');
const cached = require('gulp-cached');
const debug = require('gulp-debug');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');

gulp.task('clean', function(){
	return del('./public')
})

gulp.task('views', function() {
	return gulp.src('src/views/*.pug')
	.pipe(plumber())
	.pipe(pug({
		pretty: true
	}))
	.pipe(gulp.dest('./public'));
});

gulp.task('bower-css', function() {
	return gulp.src(mainBowerFiles('**/*.css'))
	.pipe(plumber())
	// .pipe(sourcemaps.init())
	.pipe(csso())
	.pipe(concat('combined.css'))
	// .pipe(sourcemaps.write())
	.pipe(gulp.dest('public/css'))
});

gulp.task('bower-js', function() {
	return gulp.src(mainBowerFiles('**/*.js'))
	.pipe(plumber())
	// .pipe(sourcemaps.init())
	.pipe(uglify())
	.pipe(concat('combined.js'))
	// .pipe(sourcemaps.write())
	.pipe(gulp.dest('public/js'))
});

gulp.task('styles', function() {
	return gulp.src('src/css/*.less')
	.pipe(plumber())
	// .pipe(sourcemaps.init())
	.pipe(less().on ('error', notify.onError({
			message: "<%= error.message %>",
			title  : "Less Error!"
		})))
	.pipe(autoprefixer())
	// .pipe(csso())
	.pipe(concat('style.css'))
	// .pipe(sourcemaps.write())
	.pipe(gulp.dest('public/css'));
});

gulp.task('scripts', function() {
	return gulp.src('src/js/**/*.*')
	.pipe(plumber())
	// .pipe(sourcemaps.init())
	// .pipe(uglify())
	.pipe(concat('script.js'))
	// .pipe(sourcemaps.write())
	.pipe(gulp.dest('public/js'))
});

gulp.task('fonts', function() {
	return gulp.src('src/fonts/**/*.*', {since: gulp.lastRun('fonts')})
		.pipe(plumber())
		.pipe(cached('fonts'))
		.pipe(remember('fonts'))
		.pipe(newer('fonts'))
		.pipe(debug({title: 'fonts'}))
		.pipe(gulp.dest('public/fonts'))
});

gulp.task('images', function() {
	return gulp.src('src/images/**/*.*', {since: gulp.lastRun('images')})
		.pipe(plumber())
		.pipe(cached('images'))
		.pipe(remember('images'))
		.pipe(newer('images'))
		.pipe(imagemin())
		.pipe(debug({title: 'images'}))
		.pipe(gulp.dest('public/images'))
});

gulp.task('watch', function() {
	gulp.watch('src/bower_components/**/*.*', gulp.series('bower'));
	gulp.watch('src/fonts/**/*.*', gulp.series('fonts'));
	gulp.watch('src/images/**/*.*', gulp.series('images'));
	gulp.watch('src/css/**/*.*', gulp.series('styles'));
	gulp.watch('src/views/**/*.*', gulp.series('views'));
	gulp.watch('src/js/**/*.*', gulp.series('scripts'));
});

gulp.task('serve', function() {
	browserSync.init({
		server: 'public'
	});

	browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('bower', gulp.parallel('bower-css', 'bower-js'));

gulp.task('build', gulp.series('clean', gulp.parallel('bower', 'views', 'styles', 'scripts', 'fonts', 'images')));

gulp.task('dev',
	gulp.series('build', gulp.parallel('watch', 'serve'))
);