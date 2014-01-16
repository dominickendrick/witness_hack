define(['jquery'], function (jQuery) {

    return {
    
        getParameters: function(queryString){  
    
            var urlParams = [];
            var match,
                pl     = /\+/g,  // Regex for replacing addition symbol with a space
                search = /([^&=]+)=?([^&]*)/g,
                decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
                query  = queryString
    
            urlParams = {};
            while (match = search.exec(query)){
                urlParams[decode(match[1])] = decode(match[2]);
            }
            return urlParams;
        },
        
        queryApi: function(url, params, callback){
            var paramString = jQuery.param(params);
            jQuery.ajax({
                url: url + "?" + paramString,
                success: function (data) {
                    // Node-style CPS: callback(err, data)
                    callback(null, data);
                }
            });
        }
    
    };

    
});