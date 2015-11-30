var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var path = require('path');

var config = {
    src: {
        javascripts: {
            bootstrap: "./src/javascripts/bootstrap/**/*.js",
            vendor: "./src/javascripts/vendor/**/*.js"
        },
        sass: "./src/sass/**/*.scss",
        images: "./src/images/**/*",
        html: "./src/html/**/*.html"
    },
    dist: {
        css: "./dist/css",
        javascripts: "./dist/javascripts",
        images: "./dist/images"
    }
};

gulp.task('styles', ['clean:css'], function () {
    return gulp.src(config.src.sass)
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer())
        .pipe(plugins.size({
            showFiles: true
        }))
        .pipe(gulp.dest(config.dist.css))
        .pipe(plugins.minifyCss())
        .pipe(plugins.rename({ 
            suffix: ".min" 
        }))
        .pipe(plugins.size({
            showFiles: true
        }))
        .pipe(gulp.dest(config.dist.css));
});

gulp.task('clean:css', function () {
    del.sync(['./dist/css/**/*.css'])
});


gulp.task('scripts', ['clean:js'], function () {
    return gulp.src([
        config.src.javascripts.vendor,
        config.src.javascripts.bootstrap
    ])
    .pipe(plugins.concat('app.js'))
    .pipe(plugins.size({
        showFiles: true
    }))
    .pipe(gulp.dest(config.dist.javascripts))
    .pipe(plugins.uglify())
    .pipe(plugins.rename({ 
        suffix: ".min" 
    }))
    .pipe(plugins.size({
        showFiles: true
    }))
    .pipe(gulp.dest(config.dist.javascripts));
});

gulp.task('clean:js', function () {
    del.sync(['./dist/javascripts/**/*.js'])
});

gulp.task('html:aria', function () {
    return gulp.src(config.src.html)
        .pipe(plugins.accessibility());
});

gulp.task('default', function () {
    // place code for your default task here
});