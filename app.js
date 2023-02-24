const browserSync = require('browser-sync');

browserSync({
    server:true,
    files: ['./*.html','./*css','./src/*.js']
})