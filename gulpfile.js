
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    connect = require('gulp-connect'),
    imagemin = require('gulp-imagemin'),
    notify = require('gulp-notify'),
    order = require('gulp-order'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    fontAwesome = require('node-font-awesome'),
    nodeReset = require('node-reset-scss');
    
gulp.task('styles', function(){
    return gulp.src('src/scss/*.scss')
    .pipe(sass({includePaths: [nodeReset.includePath, './node_modules/susy/sass', fontAwesome.scssPath, './bourbon']}))
    .pipe(autoprefixer('last 2 version','safari 5', 'ie 9', 'ios 6', 'android 4'))
    .pipe(gulp.dest('public/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/css'))
    .pipe(cleanCSS())
    .pipe(notify({ message: 'Styles task complete' }))
    .pipe(connect.reload());
});

gulp.task('scripts', function(){
    return gulp.src('src/js/*.js')
    .pipe(gulp.dest('public/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'))
    .pipe(notify({ message: 'Scripts task complete' }))
    .pipe(connect.reload());
});

gulp.task('html', function(){
    return gulp.src('src/index.html')
    .pipe(gulp.dest('public'))
    .pipe(notify({ message: 'HTML task complete' }))
    .pipe(connect.reload());
});

gulp.task('webserver', function() {
    connect.server({
        livereload: true
    });
});

gulp.task('watch', function(){
    gulp.watch('src/scss/**/*.scss', ['styles']);
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('src/*.html', ['html']);
    //gulp.watch('src/images/**/*', ['images']);
});

gulp.task('default', ['styles', 'scripts', 'html']);
gulp.task('server', ['webserver', 'watch']);