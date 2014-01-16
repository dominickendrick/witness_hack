#!/usr/bin/env node

/*  Node Static/API Proxy server
 *  Written by Andrew Bulhak  
 *  This code is open-source, distributed under the Apache Licence
 */ 

// The configuration starts here

//  The port to listen on for requests
var PORT = 8888;

/* The table of API endpoints to send requests to. 
   Each has a path prefix to match on, followed by a URL path to send to
 */

 var proxytable = [
   // A simple redirection
   { prefix : '/n0tice', endpoint: "http://n0ticeapis.com" },
   // an API redirection which specifies a HTTP header bearing authentication information
   { prefix : "/media", endpoint: "https://api.example.com", headers: { "X-Example-API-Key" : "EGOTISTICALAARDVARK" } }

 ];


// End of configuration; you may safely ignore the script below

var http = require("http");
var https = require("https");
var url = require("url");
var nstatic = require("node-static");

/* Return a function that accepts the incoming response, opens a connection
   to the HTTPS server it is configured with, and pipes the response in.
   The first argument is the protocol module; this is typically either http or https,
   though anything else that behaves like either of those will work. 
   The second is an object of options; these are mixed into the outgoing request.
 */

// fix up the proxy table; convert the static descriptions of endpoints to proxy-making functions

function mkProxy(protocol, opts) {
	return function(pathname, response) {
		  opts.path = pathname;
    	var req = protocol.request(opts, function(res){
    		res.on('data', function(d) { response.write(d);	});
    		res.on('end', function() { response.end(); });
    	});
    	req.end();
    	req.on("error", function(e){ console.error(e); 	response.end();	});
    }
}

proxytable.forEach(function(proxyentry){
  var parsed = url.parse(proxyentry.endpoint);
  var opts = { hostname: parsed.hostname};
  if(parsed.port) opts.port = parsed.port;
  if(proxyentry.headers) opts.headers = proxyentry.headers;
  var protocol = {'https:':https, 'http:':http}[parsed.protocol];
  if (!protocol) { 
    console.error("Undefined protocol: "+parsed.protocol);
  }
  proxyentry.proxyfunc = mkProxy(protocol, opts);
});

var fileServer = new nstatic.Server('./static');

http.createServer(function(request, response) {
	var parsed = url.parse(request.url);	
	var pathname = parsed.path;

	var found = false;
	proxytable.forEach(function(proxyentry){
		var prefix = proxyentry.prefix;
		if(pathname.substring(0, prefix.length) == prefix) {
			proxyentry.proxyfunc(pathname.substring(prefix.length), response);
			found = true;
		}
	});
	if(!found) {
		// serve a static file.
		request.addListener('end', function () {
			fileServer.serve(request, response);
		}).resume();
	}

}).listen(PORT);
console.log("Listening on port "+PORT);
