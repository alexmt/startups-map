'use strict';

const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const tsify = require('tsify');
const source = require('vinyl-source-stream');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const watch = require('gulp-watch')
const watchify = require('watchify');
const notify = require('gulp-notify');
const flatten = require('gulp-flatten');
const extend = require('extend');
const gutil = require('gulp-util');
const ghPages = require('gulp-gh-pages');

const SRC_DIR = 'src/ui'
const DIST_DIR = 'dist'

function appScript(watchChanges) {
	let bundler = browserify({
		cache: {}, // required for watchify
			packageCache: {}, // required for watchify
			fullPaths: watchChanges, // required to be true only for watchify
		})
    .add(`${SRC_DIR}/app/main.ts`)
    .plugin(tsify, extend({}, require('./tsconfig.json'), { sourceMap: true }))
		.transform(babelify, { extensions: [ '.tsx', '.ts' ] });
	bundler = watchChanges ? watchify(bundler) : bundler;

	function rebundle() {
		let start = Date.now();
		return bundler.bundle()
	    .on('error', process.env.NODE_ENV !== 'ci' ? notify.onError('Error: <%= error.message %>') : gutil.log)
			.pipe(source('app.js'))
	    .pipe(gulp.dest(DIST_DIR))
			.pipe(process.env.NODE_ENV !== 'ci' ? notify(function () {
				return `App JS bundle built in ${(Date.now() - start)} ms`;
			}) : gutil.noop());
	}

	bundler.on('update', rebundle);
	return rebundle();
}

function vendorScript() {
	gulp.src([
		'node_modules/zone.js/dist/zone.js',
		'node_modules/reflect-metadata/Reflect.js',
		'node_modules/systemjs/dist/system.src.js'
	])
	.pipe(concat('vendor.js'))
	.pipe(gulp.dest(DIST_DIR));
}

function staticFiles(watchChanges) {
	return (watchChanges ? watch : gulp.src)(`${SRC_DIR}/**/*.html`, { ignoreInitial: false })
			.pipe(flatten())
			.pipe(gulp.dest(DIST_DIR));
}

function serve() {
	return browserSync({
		server: {
			baseDir: DIST_DIR,
		},
		ghostMode: false,
		port: 5001,
		open: false,
	});
}

function deploy() {
  return gulp.src('./dist/**/*').pipe(ghPages({
		remoteUrl: 'git@github.com:alexmt/startups-map.git'
	}));
}

gulp.task('appScript', () => appScript(false));
gulp.task('appScript:w', () => appScript(true));
gulp.task('static', () => staticFiles(false));
gulp.task('static:w', () => staticFiles(true));
gulp.task('vendorScript', vendorScript);
gulp.task('build', ['static', 'vendorScript', 'appScript']);
gulp.task('serve', serve);
gulp.task('dev', ['static:w', 'appScript:w', 'vendorScript', 'serve'])
gulp.task('deploy', deploy);
