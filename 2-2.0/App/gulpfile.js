'use strict';

var gulp = require ('gulp');
var clean = require('gulp-clean');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var rename = require("gulp-rename");
var sass = require("gulp-sass");
var cleanCSS = require('gulp-clean-css');
var fileinclude = require('gulp-file-include');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');
var zip = require('gulp-zip');
var w3cjs = require('gulp-w3cjs');
var through2 = require('through2');
var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imageminZopfli = require('imagemin-zopfli');
var imageminMozjpeg = require('imagemin-mozjpeg');
var imageminGiflossy = require('imagemin-giflossy');

var paths = {
    root: './',
    favicon: 'favicon.png',
    html: {
        files: '*.html',
        src: {
            includes: 'src/html/_includes/**/*.html',
            files: 'src/html/*.html'
        }
    },
    scss: {
        dir: 'src/scss',
        app: 'src/scss/app.scss',
        files: 'src/scss/**/*.scss'
    },
    js: {
        dir: 'resources/js',
        files: 'resources/js/**/*',
        src: {
            dir: 'src/js',
            files: 'src/js/**/*.js',
            concat: [
                'src/js/functions.js',
                'src/js/vendors/**/*.js'
            ]
        }
    },
    img: {
        dir: 'resources/img',
        files: 'resources/img/**/*'
    },
    css: {
        dir: 'resources/css',
        files: 'resources/css/**/*'
    },
    fonts: {
        files: 'resources/fonts/**/*'
    },
    vendors: {
        files: 'resources/vendors/**/*'
    },
    demo: {
        files: 'demo/**/*'
    },
    cleanup: [
        '**/.idea',
        '**/.DS_Store',
        '**/Thumbs.db',
        '**/__MACOSX',
        'dist',
        'disting'
    ],
    dist: {
        making: 'disting',
        files: 'disting/**/*',
        dir: 'dist',
        zip: 'dist.zip'
    }
};

// Clean temp. files
function cleanFiles () {
    return gulp.src(paths.cleanup, {
        read: false,
        allowEmpty: true
    })
        .pipe(clean({
            force: true
        }))
}

function cleanDist () {
    return gulp.src(paths.dist.making, {
        read: false,
        allowEmpty: true
    })
        .pipe(clean({
            force: true
        }))
}


// Compile SCSS to CSS
// Minify CSS
// Rename minified CSS
function handleCSS () {
    return gulp.src (paths.scss.app)
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest (paths.css.dir))
        .pipe(cleanCSS({
            level: {
                1: {
                    specialComments: 0
                }
            }
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest (paths.css.dir));
}


// Include Partial HTML files
function html() {
    return gulp.src(paths.html.src.files)
        .pipe(fileinclude({
            indent: true
        }))
        .pipe(gulp.dest(paths.root));
}


// JS minify and concat
function handleJS () {
    return gulp.src(paths.js.src.concat)
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.js.dir))
}


// Web server (if needed webserver can be started at port 8000)
gulp.task('webserver', function() {
    gulp.src(paths.dist.dir)
        .pipe(webserver({
            livereload: false,
            directoryListing: true,
            open: true
        }));
});


// Watch
gulp.task('watch', function () {
    // HTML
    gulp.watch([paths.html.src.includes, paths.html.src.files], gulp.series(html));

    // SCSS
    gulp.watch(paths.scss.files, gulp.series(handleCSS));

    // JS
    gulp.watch(paths.js.src.files, gulp.series(handleJS));
});


// Create dist version
function copyToDist () {
    return gulp.src([
        paths.html.files,
        paths.js.files,
        paths.css.files,
        paths.img.files,
        paths.fonts.files,
        paths.vendors.files,
        paths.demo.files,
        paths.favicon,
    ], { base: './' })
        .pipe(gulp.dest(paths.dist.making))
}


// Zip the dist folder
function zipDist () {
    return gulp.src(paths.dist.files)
        .pipe(zip('dist.zip'))
        .pipe(gulp.dest(paths.dist.dir))
}


// Validate HTML files
gulp.task('validate', function () {
    return gulp.src(paths.html.files)
        .pipe(w3cjs())
        .pipe(through2.obj(function(file, enc, cb){
            cb(null, file);
            if (!file.w3cjs.success){
                throw new Error('HTML validation error(s) found');
            }
        }));
});


// Compress images
gulp.task('imagemin', function () {
    return gulp.src(paths.img.files)
        .pipe(cache(imagemin([
            imageminPngquant({
                speed: 1,
                quality: [0.95, 1]
            }),
            imageminZopfli({
                more: true
            }),
            imageminGiflossy({
                optimizationLevel: 3,
                optimize: 3,
                lossy: 2
            }),
            imagemin.svgo({
                plugins: [{
                    removeViewBox: false
                }]
            }),
            imagemin.jpegtran({
                progressive: true
            }),
            imageminMozjpeg({
                quality: 90
            })
        ])))
        .pipe(gulp.dest(paths.img.dir));
});


// Build dist version
gulp.task('build', gulp.series(cleanFiles, html, handleCSS, handleJS, copyToDist, zipDist, cleanDist));


// Default task
gulp.task('default', gulp.parallel('build'));