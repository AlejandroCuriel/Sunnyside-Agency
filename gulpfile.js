const {src, dest, watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
sass.compiler = require('sass');

const paths = {
    url_scss: 'src/scss/**/*.scss',
    url_images: 'src/images/**/*.jpg',
    url_images_svg: 'src/images/**/*.svg'
}

function compilarSass(){
    return src(paths.url_scss)
        .pipe( sass())
        .pipe( dest("./build/css"))
}
function minificarImagenes(){
    return src([paths.url_images, paths.url_images_svg])
        .pipe( imagemin())
        .pipe( dest('./build/img'))
        .pipe( notify("Imagen Minificada"))
}
function minificarCss(){
    return src(paths.url_scss)
        .pipe( sass({
            outputStyle: 'compressed'
        }))
        .pipe( dest('./build/css'))
}
function expandirCss(){
    return src(paths.url_scss)
        .pipe( sass({
            outputStyle: 'expanded'
        }))
        .pipe( dest('./build/css'))
}
function watchArchivos(){
    watch(paths.url_scss, compilarSass);
}
exports.compilarSass = compilarSass;
exports.watchArchivos = watchArchivos;
exports.minificarCss = minificarCss;
exports.expandirCss = expandirCss;
exports.minificarImagenes = minificarImagenes;