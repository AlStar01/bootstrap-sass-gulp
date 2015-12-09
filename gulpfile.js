////////////////////////////////
/*
    CONFIG
    STYLES
    SCRIPTS
    HTML
    IMAGES
    BUILD
    CLEAN
    WATCH
    DEFAULT
*/
////////////////////////////////


////////////////////////////////
////////////////////////////////
/*
    CONFIG
*/
////////////////////////////////
////////////////////////////////


var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var path = require('path');

var config = {
    src: {
        javascripts: {
            bootstrap: "./src/javascripts/bootstrap/**/*.js",
            app: "./src/javascripts/app/**/*.js",
            vendor: "./src/javascripts/vendor/"
        },
        sass: "./src/sass/**/*.scss",
        images: "./src/images/**/*",
        html: "./src/html/**/*.html"
    },
    dev: {
        css: "./dev/css",
        javascripts: "./dev/javascripts",
        images: "./dev/images",
        html: "./dev/html",
        tasks: [
            "styles:dev",
            "scripts:dev",
            "html:dev",
            "test:phantomcss"
        ]
    },
    dist: {
        css: "./dist/css",
        uncss: "./dist/css/uncss",
        javascripts: "./dist/javascripts",
        images: "./dist/images",
        html: "./dist/html"
    },
    build: {
        tasks: [
            'scripts:prod',
            'styles:prod',
            'html:prod',
            'images:prod'
        ]
    }
};

////////////////////////////////
////////////////////////////////
/*
    STYLES
*/
////////////////////////////////
////////////////////////////////

gulp.task('styles:prod', ['clean:css', 'styles:uncss'], function () {
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

gulp.task('styles:dev', function () {
    return gulp.src(config.src.sass)
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer())
        .pipe(plugins.size({
            showFiles: true
        }))
        .pipe(gulp.dest(config.dev.css));
});

gulp.task('styles:uncss', function () {
    return gulp.src(config.src.sass)
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer())
        .pipe(plugins.uncss({
            html: [
                './src/html/**/*.html'
            ]
        }))
        .pipe(plugins.minifyCss())
        .pipe(plugins.rename({
            suffix: ".min"
        }))
        .pipe(plugins.size({
            showFiles: true
        }))
        .pipe(gulp.dest(config.dist.uncss));
});

gulp.task('test:phantomcss', function() {
    return gulp.src('./tests/css/testsuite.js')
        .pipe(plugins.phantomcss());
});

gulp.task('styleguide', ['clean:styleguide', 'clean:css', 'styles:prod'], function() {
    return plugins.run('kss-node --config kss-config.json').exec();
});


////////////////////////////////
////////////////////////////////
/*
    SCRIPTS
*/
////////////////////////////////
////////////////////////////////

gulp.task('scripts:dev', function () {
    return gulp.src([
        config.src.javascripts.vendor + 'jquery.js',
        config.src.javascripts.bootstrap,
        config.src.javascripts.app
    ])
    .pipe(plugins.concat('app.js'))
    .pipe(plugins.size({
        showFiles: true
    }))
    .pipe(gulp.dest(config.dev.javascripts));
});

gulp.task('scripts:prod', ['clean:js'], function () {
    return gulp.src([
        config.src.javascripts.vendor + 'jquery.js',
        config.src.javascripts.app,
        config.src.javascripts.bootstrap
    ])
    .pipe(plugins.concat('app.js'))
    .pipe(plugins.uglify())
    .pipe(plugins.rename({ 
        suffix: ".min" 
    }))
    .pipe(plugins.size({
        showFiles: true
    }))
    .pipe(gulp.dest(config.dist.javascripts));
});

gulp.task('scripts:jsdoc', plugins.shell.task([
    '"node_modules/.bin/jsdoc.cmd" -c ./doc-config.json'
]));


////////////////////////////////
////////////////////////////////
/*
    HTML
*/
////////////////////////////////
////////////////////////////////

gulp.task('html:aria', function () {
    return gulp.src(config.src.html)
        .pipe(plugins.accessibility());
});

gulp.task('html:dev', ['html:aria'],function(){
    return gulp.src(config.src.html)
        .pipe(plugins.size({
            showFiles: true
        }))
        .pipe(gulp.dest(config.dev.html));
});

gulp.task('html:prod', ['clean:html'],function(){
    return gulp.src(config.src.html)
        .pipe(plugins.size({
            showFiles: true
        }))
        .pipe(plugins.minifyHtml())
        .pipe(plugins.size({
            showFiles: true
        }))
        .pipe(gulp.dest(config.dist.html));
});


////////////////////////////////
////////////////////////////////
/*
    IMAGES
*/
////////////////////////////////
////////////////////////////////

gulp.task('images:dev', function() {
   return gulp.src(config.src.images)
    .pipe(plugins.imagemin())
    .pipe(gulp.dest(config.dev.images));
});

gulp.task('images:prod', function() {
   return gulp.src(config.src.images)
    .pipe(plugins.imagemin())
    .pipe(gulp.dest(config.dist.images));
});


////////////////////////////////
////////////////////////////////
/*
    BUILD
*/
////////////////////////////////
////////////////////////////////

gulp.task('build:prod', function(){
    config.build.tasks.forEach( function ( task ) {
        gulp.start( task );
      });
});

gulp.task('build:dev', ['clean:dev'], function(){
    config.dev.tasks.forEach( function ( task ) {
        gulp.start( task );
      });
});


////////////////////////////////
////////////////////////////////
/*
    CLEAN
*/
////////////////////////////////
////////////////////////////////

gulp.task('clean:css', function () {
    del.sync([
        './dist/css/**/*.css'
    ])
});

gulp.task('clean:styleguide', function () {
    del.sync([
        './styleguide/**/*'
    ])
});

gulp.task('clean:js', function () {
    del.sync([
        './dist/javascripts/**/*.js'
    ])
});

gulp.task('clean:html', function () {
    del.sync([
        './dist/html/**/*.html'
    ])
});

gulp.task('clean:prod', function () {
    del.sync([
        './dist/html/**/*.html',
        './dist/css/**/*.css',
        './dist/javascripts/**/*.js',
        './dist/images/**/*'
    ])
});

gulp.task('clean:dev', function () {
    del.sync([
        './dev/html/**/*.html',
        './dev/css/**/*.css',
        './dev/javascripts/**/*.js',
        './dev/images/**/*'
    ])
});

////////////////////////////////
////////////////////////////////
/*
    WATCH
*/
////////////////////////////////
////////////////////////////////

gulp.task('watch', function(){
    gulp.watch(config.src.sass, ['styles:dev', 'test:phantomcss']);
    gulp.watch(config.src.javascripts.app, ['scripts:dev']);
    gulp.watch(config.src.html, ['html:dev, test:phantomcss']);
    gulp.watch(config.src.images, ['images:dev']);
});

gulp.task('default', ['watch'], function () {
    return plugins.util.log("Gulp is running");
});