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
    dist: {
        css: "./dist/css",
        javascripts: "./dist/javascripts",
        images: "./dist/images"
    },
    build: {
        tasks: [
            'scripts',
            'styles',
            'html:aria'
        ]
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

gulp.task('styles:uncss', ['clean:css'], function () {
    return gulp.src(config.src.sass)
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer())
        .pipe(plugins.uncss({
            html: [
                './src/html/**/*.html'
            ]
        }))
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


gulp.task('scripts:dev', ['clean:js'], function () {
    return gulp.src([
        config.src.javascripts.vendor + 'jquery.js',
        config.src.javascripts.bootstrap,
        config.src.javascripts.app
    ])
    .pipe(plugins.concat('app.js'))
    .pipe(plugins.size({
        showFiles: true
    }))
    .pipe(gulp.dest(config.dist.javascripts));
});

gulp.task('scripts:prod', ['clean:js'], function () {
    return gulp.src([
        config.src.javascripts.vendor + 'jquery.js',
        config.src.javascripts.app,
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

gulp.task('build', function(){
    config.build.tasks.forEach( function ( task ) {
        gulp.start( task );
      });
});

// Watch tasks

gulp.task('watch', function(){
    gulp.watch(config.src.sass, ['styles']);
    gulp.watch([
        config.src.javascripts.vendor + 'jquery.js',
        config.src.javascripts.bootstrap,
        config.src.javascripts.app
    ], ['scripts:dev']);
});

gulp.task('default', ['watch'], function () {
    return plugins.util.log("Gulp is running");
});