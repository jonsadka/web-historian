var http = require("http");
var url = require("url");
var siteHandler = require("./request-handler");
var httpHelp = require("./http-helpers");
var $ = require("../bower_components/jquery/dist/jquery.js");

var port = 8080;
var ip = "127.0.0.1";

var routeMap = {
  '/': siteHandler,
  '/archives/sites': siteHandler
};

var server = http.createServer(function(req, res) {

  var parsedUrl = url.parse(req.url);

  var route = routeMap[parsedUrl.pathname];
  console.log(req.url, route);
  if ( route || (parsedUrl.pathname.substring(0,4) === '/www') ){
    route.handleRequest(req, res);
  } else {
    httpHelp.send404(res);
  }

});

console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

