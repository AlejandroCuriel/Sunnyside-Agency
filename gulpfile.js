//Constantes globales a utilizar
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');
sass.compiler = require('sass');

//Direcciones mas usadas en funciones
const paths = {
    url_scss: 'src/scss/**/*.scss',
    url_images: 'src/images/**/*.jpg',
    url_images_svg: 'src/images/**/*.svg'
}
//Secciones de funciones para la optimizacion y facilidad de tareas
function compilarSass(){
    return src(paths.url_scss)
        .pipe( sourcemaps.init())
        .pipe( sass())
        .pipe( postcss( [autoprefixer(), cssnano()] ))
        .pipe( sourcemaps.write('.'))
        .pipe( dest("./build/css"))
}

function minificarImagenes(){
    return src( [paths.url_images, paths.url_images_svg] )
        .pipe( imagemin())
        .pipe( dest('./build/img'))
        .pipe( notify("Imagen Minificada"))
}

function webpImagenes(){
    return src(paths.url_images)
        .pipe( webp())
        .pipe( notify('Imagen JPG transformada Imagen Webp'))
        .pipe( dest('build/img'))
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

//Creando tareas 
exports.compilarSass = compilarSass;
exports.watchArchivos = watchArchivos;
exports.minificarCss = minificarCss;
exports.expandirCss = expandirCss;
exports.minificarImagenes = minificarImagenes;
exports.webpImagenes = webpImagenes;

//Tarea creada por defecto con llamadas de otras tareas al inicializar gulp 
exports.default = series(compilarSass, minificarImagenes, webpImagenes, watchArchivos)