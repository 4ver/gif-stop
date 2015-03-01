gulp = require 'gulp'
$ = require('gulp-load-plugins')()

sourceDirectory = './src/'
scripts = sourceDirectory + '*.coffee'
coffeeLintRules = './coffeelint.json'
scriptsEntryPoint = sourceDirectory + 'index.coffee'
distDirectory  = './dist/'


onCoffeelintFailure = (numberOfWarnings, numberOfErrors) =>
    $.util.beep()
    throw new Error """
        CoffeeLint failure; see above.
            Warning count: #{numberOfWarnings}.
            Error count: #{numberOfErrors}.
    """

gulp.task 'default', ['compile']

gulp.task 'compile', =>
    gulp.src(scriptsEntryPoint)
        # .pipe($.coffeelint(optFile: coffeeLintRules))
        # .pipe($.coffeelint.reporter())
        # .pipe($.coffeelintThreshold 0, 0, onCoffeelintFailure)
        # .pipe($.coffee({bare:true}))
        .pipe($.webpack(
            output:
                filename: 'gifStop.debug.js'
                library: "gifStop"
                libraryTarget: "umd"
            module:
                loaders: [
                    test: /\.coffee$/, loader: 'coffee-loader'
                ]

        ))
        .pipe(gulp.dest(distDirectory))
        .pipe($.uglify(
            mangle: true
        ))
        .pipe($.rename('gifStop.min.js'))
        .pipe(gulp.dest(distDirectory))
