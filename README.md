Node Static API Proxy Server (nsaproxy)
=======================================

Node Static/API Proxy server is a basic Node.js-based server for serving 
local files and proxying calls to APIs running on third-party servers. It is 
intended for use for quickly making client-side JavaScript applications 
which depend on access to APIs hosted on third-party domains, especially 
those APIs which don't provide JSONP or any other method to get around 
cross-domain restrictions.

This is not a node module, but rather a single file one calls from the 
command line, after modifying it to mirror the required APIs. One then 
puts one's client-side HTML, JavaScript, CSS and other content in the 
static/ subdirectory, and accesses it by going to localhost:8888 (or another
port, if configured).

nsaproxy was written by Andrew Bulhak during the Guardian's January 2014 Hack Day.
It is still a work in progress, and could do with a lot of improvement.
