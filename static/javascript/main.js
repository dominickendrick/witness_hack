requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'javascript',
    paths: {
        lib: 'lib',
        src: 'src',
        'handlebars': 'lib/handlebars/handlebars',
        "jquery": "https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min"
    },
    shim: {
        'handlebars': {
                 exports: 'Handlebars'
        }
    }
});

// Start the main app logic.
requirejs(['jquery','src/witness'],
function   (jQuery, witness) {
    
    var queryString = window.location.href.slice(window.location.href.indexOf('?') + 1);

    var url = '/n0tice/2/search';
    
    params = witness.getParameters(queryString);

    var callback = function(err,data){
                
        var output = JSON.parse(data);
        
        console.log(output)
        
        //truncate results
        output.results = output.results.slice(0, 4);
        
        renderdOutput = witness.renderOutput(output);
        
        jQuery('#data').html(renderdOutput);
    }
    
    witness.queryApi(url, params, callback);
    

});