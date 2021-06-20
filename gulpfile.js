let preprocessor = 'sass';
const { src, dest, parallel, series, watch} = require('gulp'),
    browserSync  = require('browser-sync').create(),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify-es').default,
    sass         = require('gulp-sass'),
    less        = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    cleancss     = require('gulp-clean-css'),
    imagemin     = require('gulp-imagemin'),
    newer        = require('gulp-newer'),
    del        = require('del');


function browsersync() {
    browserSync.init({
        server: { baseDir:'app/' },
        notify: false, //убираем надпись в правом вверхнем углу при F5
        online: true //ставим онлайн сеть
    })
}

function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.min.js',
        'app/js/app.js' // идёт в конце т.к. используем фремворки или библиотеки
    ])
    .pipe(concat('app.min.js')) //конкатинируем в новый файл app.min.js
    .pipe(uglify()) //сжимаем в одну строку
    .pipe(dest('app/js/')) //выгрузка в папку js
    .pipe(browserSync.stream())
}

function styles() {
    return src('app/' + preprocessor + '/main.' + preprocessor + '')
    .pipe(eval(preprocessor)())
    .pipe(sass())
    .pipe(concat('app.min.css'))
    .pipe(autoprefixer({overrideBrowserslist: ['last 10 versions'], grid: true}))
    .pipe(cleancss({level: {1: {specialComments: 0}}/*, format: 'beautify'*/}))
    .pipe(dest('app/css/'))
    .pipe(browserSync.stream())
}

function images() {
    return src('app/images/src/**/*')
    .pipe(newer('app/images/dest')) //сравнение файлов, если они оптимизированы, то оптимизации не будет
    .pipe(imagemin())
    .pipe(dest('app/images/dest'))
}

function cleanimg() {
    return del('app/images/dest**/*, {force: true}') //удаляем форсировано папку
}

function cleandist() {
    return del('dist/**/*', {force: true})
}

function buildcopy() {
    return src([
        'app/css/**/*.min.css',
        'app/js/**/*.min.js',
        'app/images/dest/**/*',
        'app/**/*.html'
    ], {base: 'app'}) //base-откуда берём
    .pipe(dest('dist'))
}

function startwatch() {
    watch('app/**/' + preprocessor + '/**/*', styles);
    watch(['app/**/*.js', '!app/&&/*.min.js'], scripts); //выборка, !-не включает *.min.js
    watch('app/**/*.html').on('change', browserSync.reload); //при изменении вызываем reload 
    watch('app/images/src/**/*', images)
}



//экспорт функций в таск
exports.browsersync = browsersync; //экспорт, название таска = функция
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.cleanimg = cleanimg;
exports.build = series(styles, scripts, images, buildcopy);

//экспорт функций в дефолтный таск, можно выполнить все задачи параллельно
exports.default = parallel(cleandist, styles, scripts, browsersync, startwatch);