requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'javascript',
    paths: {
        lib: 'lib',
        src: 'src',
        "jquery": "https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min"
    }
});

// Start the main app logic.
requirejs(['jquery','src/witness'],
function   (jQuery, witness) {
    
    var queryString = 'location=paris&group=group/guardianwitness/travel';
    var url = 'http://n0ticeapis.com/2/search?';
    params = witness.getParameters(queryString);

    var callback = function(err,data){
        jQuery('#data-display').html(data);
    }
    
    witness.queryApi(url, params, callback);
    

});