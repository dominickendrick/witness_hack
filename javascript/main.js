requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: '',
    paths: {
        lib: '../lib',
        src: 'src',
        spec: 'spec'
    }
});

// Start the main app logic.
requirejs(['src/witness'],
function   (witness) {
   
});