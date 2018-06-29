var gulp = require('gulp');
var args = require('yargs').argv;
var browserSync = require('browser-sync');
var config = require('./gulp.config')();
var del = require('del');
var $ = require('gulp-load-plugins')({lazy: true});
var ngAnnotate = require('gulp-ng-annotate');
var gulpNgConfig = require('gulp-ng-config');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
gulp.task('help', $.taskListing);
gulp.task('default', ['help']);


gulp.task('clean-tmp', function(done) {
    var files = config.tmp;
    clean(files, done);
});

gulp.task('clean', function(done) {
    var delconfig = [].concat(config.dist, config.tmp);
    log('Cleaning ' + $.util.colors.blue(delconfig));
    del(delconfig, done);
});

gulp.task('clean-all', function(done) {
    var delconfig = config.allToClean;
    log('Cleaning ' + $.util.colors.blue(delconfig));
    clean(delconfig, done);
});

gulp.task('inject', function() {
    log('Injecting custom scripts to index.html');
    return gulp
        .src(config.index)
        .pipe( $.inject(gulp.src(config.js), {relative: true}) )
        .pipe(gulp.dest(config.client));
});

gulp.task('copy', function() {
    log('Copying assets');
    return gulp
        .src(config.assets, {base: config.client})
        .pipe(gulp.dest(config.dist + '/'));
});

gulp.task('copy-fonts', function () {
    return gulp.src(config.fonts)
        .pipe(gulp.dest('./dist/fonts/')); // copy to dist/fonts
});

gulp.task('optimize', ['inject'], function() {
    log('Optimizing the js, css, html');

    var assets = $.useref.assets({
        searchPath: [config.client, config.tmp]
    });
    var cssFilter = $.filter('**/*.css', {restore: true});
    var jsFilter = $.filter('**/*.js', {restore: true});

    return gulp
        .src(config.index)
        .pipe($.plumber({errorHandler: swallowError}))
        .pipe(assets)

        .pipe(cssFilter)
        //.pipe($.concat('styles/main.css'))
        .pipe($.cssmin())
        .pipe(rev())
        .pipe(cssFilter.restore)

        .pipe(jsFilter)
        .pipe(ngAnnotate())
        .pipe($.uglify())
        .pipe(rev())
        .pipe(jsFilter.restore)
        .pipe(assets.restore())
        .pipe(revReplace())    
        .pipe($.useref())
        .pipe(gulp.dest( config.dist ));
});


gulp.task('serve', [], function() {
    startBrowserSync('serve');
});

gulp.task('build', ['optimize', 'copy','copy-fonts'], function() {
    startBrowserSync('dist');
})

gulp.task('serve-dist', function() {
    gulp.run('build');
})

function clean(path, done) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path, done);
}

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.green(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.green(msg));
    }
}

function swallowError (error) {
    // If you want details of the error in the console
    console.log(error.toString());

    this.emit('end');
}

function startBrowserSync(opt) {
    if (args.nosync || browserSync.active) {
        return;
    }

    var options = {
        port: 3000,
        ghostMode: {
            clicks: false,
            location: false,
            forms: false,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 0, //1000,
        online: false
    };

    switch(opt) {
        case 'dist':
            log('Serving dist app');
            serveDistApp();
            break;        
        default:
            log('Serving app');
            serveApp();
            break;
    }

    function serveApp() {
        options.server = {
            baseDir: [
                config.client,
                config.tmp
            ]
        };
        options.files = [
            config.client + '/**/*.*',
            config.tmp + '/**/*.css'
        ];

        browserSync(options);
    }

    function serveDistApp() {
        options.server = {
            baseDir: [
                config.dist
            ]
        };
        options.files = [];

        browserSync(options);
    }

   
}


