'use strict';

const gulp = require('gulp');
const jshint = require('gulp-jshint');
const uglify = require('gulp-uglify');
const clean = require('gulp-clean');
const notify = require("gulp-notify");
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const rename = require("gulp-rename");
const watch = require('gulp-watch');
const batch = require('gulp-batch');
const plumber = require('gulp-plumber');
const babelify = require('babelify');
const jsdoc = require('gulp-jsdoc3');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
 
const files = [
    './src/ElasticEmailClient.js'
];

gulp.task('clean', () => {
    return gulp.src(['./bin/*', './ElasticEmailClient.js', 'ElasticEmailClient.js.map'])
        .pipe(clean());
});


gulp.task('lint', () => {
    return gulp.src(files)
    .pipe(plumber())
    .pipe(
        jshint()
        .on('error',
            notify.onError((err) => {
                console.error(err);
                return "Error: " + err.message;
            })
        )
    )
    .pipe(jshint.reporter('jshint-stylish'))
});

gulp.task('browserify', ['babel'], () => {
    browserify('./ElasticEmailClient.js', {
        standalone: 'EEAPI'
    })
    .transform(babelify.configure(
        {
            global: true,
            presets: ['es2016'] 
        }
    ))
    .bundle()
    .pipe(source('ElasticEmailClient.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./bin'))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./bin'));
});

gulp.task('doc', ['clean'], (cb) => {
    gulp.src(['./src/**/*.js'], {read: false})
        .pipe(jsdoc(cb));
});

gulp.task('babel', ['lint'], () => {
    return gulp.src(files)
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(concat('ElasticEmailClient.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(
        gulp.dest('.')
    )
});

gulp.task('build', ['clean'], () => {
    gulp.start(['lint', 'doc', 'babel', 'browserify']);
});

gulp.task('default', () => {
    gulp.start(['build']);
})

gulp.task('watch', () => {
    return watch(files, batch((ev, done) => {
        gulp.start('build', done)
    })); 
});