var http = require("http");
var url = require("url");
var siteHandler = require("./request-handler");

var port = 8080;
var ip = "127.0.0.1";

var routeMap = {
  '/': siteHandler,
  '/archives/sites': siteHandler
};

var server = http.createServer(function(req, res) {

  var parsedUrl = url.parse(req.url);

  // console.log('This is the route: ' + parsedUrl);

  // siteHandler(req, res, parsedUrl);

  var route = routeMap[parsedUrl.pathname];
  if(route) {
    route(req, res, parsedUrl.pathname);
  } else {
    utils.send404(res);
  }

});

console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

