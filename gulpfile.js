var gulp = require('gulp');

var jade = require('gulp-jade');
var filter = require('gulp-filter');
var jshint = require('gulp-jshint');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var frontMatter = require('gulp-front-matter');
var markdown = require('gulp-markdown');
var parse = require('stratic-parse-header');
var straticToJson = require('stratic-post-to-json-data');
var jadeTemplate = require('gulp-jade-template');
var dateInPath = require('stratic-date-in-path');

/* Shared configurations */

/* Build tasks */

/* TODO: validate HTML */

gulp.task('html', function() {
	gulp.src(['src/hacks/*.jade'])
	    .pipe(jade({ pretty: true }))
	    .pipe(rename({ extname: '.html' }))
	    .pipe(gulp.dest('dist/hacks'));
	gulp.src(['src/cryptoparty-seattle/*.jade'])
	    .pipe(jade({ pretty: true }))
	    .pipe(rename({ extname: '.html' }))
	    .pipe(gulp.dest('dist/cryptoparty-seattle'));
	return gulp.src(['src/*.jade'])
	           .pipe(jade({ pretty: true }))
	           .pipe(rename({ extname: '.html' }))
	           .pipe(gulp.dest('dist'));
});

gulp.task('css', function() {
	gulp.src('src/styles/*')
	    .pipe(gulp.dest('dist/css'));
	gulp.src('css/*')
	    .pipe(gulp.dest('dist/css'));
});

gulp.task('images', function() {
	return gulp.src('src/images/*')
	           .pipe(gulp.dest('dist/images'));
});

gulp.task('font', function() {
	return gulp.src('font/*')
	           .pipe(gulp.dest('dist/font'));
});

gulp.task('js', function() {
	return gulp.src('js/*')
	           .pipe(gulp.dest('dist/js'));
});

gulp.task('post-index', function() {

});

gulp.task('posts', function() {
	return gulp.src('src/blog/*.md')
	           .pipe(parse())
	           .pipe(markdown())
	           .pipe(dateInPath())
	           .pipe(straticToJson())
	           .pipe(jadeTemplate('src/blog/post.jade'))
	           .pipe(rename({ extname: '.html' }))
	           .pipe(gulp.dest('dist/blog'));
});

gulp.task('rss', function() {
	gulp.src('src/posts/*.md')
	    .pipe(frontMatter())
	.pipe(gulp.dest('dist/posts/rss.xml'));
});

/* Lint tasks */

gulp.task('csslint', function() {

});

gulp.task('jshint', function() {
	gulp.src(['js/*.js', '!vendor/*', '!plugins.js'])
	    .pipe(jshint());
});

/* Helper tasks */

gulp.task('blog', ['posts', 'rss'], function() {

});

gulp.task('build', ['html', 'css', 'js', 'font', 'images', 'blog'], function() {

});

gulp.task('lint', ['csslint', 'jshint'], function() {

});

gulp.task('watch', function() {
	gulp.watch('src/*.jade', ['html']);
	gulp.watch('src/styles/*.stylus', ['css']);
	gulp.watch('src/js/*.js', ['js']);
	gulp.watch('src/posts/*.md', ['blog']);
});

/* Default task */

gulp.task('default', ['build', 'lint'], function() {

});