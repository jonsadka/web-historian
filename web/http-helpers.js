var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.postResponse = function(req, res){
  res.writeHead(302, headers);

  var path = req.url;

  console.log('path: ', path)

  archive.addUrlToList(req, res, path, archive.downloadUrls);

  // by default, no need to check home since this is a post request
  // archive.readListOfUrls(req.url, function(fullPath) {
    // exports.serveAssets(fullPath, res.end);
  // });

};

exports.getResponse = function(req, res) {
  res.writeHead(200, headers);

  if ( req.url === '/' ){
    var path = 'home';
  } else {
    var path = req.url;
  }

  archive.readListOfUrls(req, res, path, function(fullPath) {
    exports.serveAssets(fullPath, res.end.bind(res));
  }, exports.postResponse);

};

exports.serveAssets = function(asset, callback) {
  fs.readFile(asset, 'binary', function (err, data) {
    if(err) { throw err; };
    callback(data);
  });
};

exports.send404 = function(res) {
  statusCode = 404;
  res.writeHead(statusCode, headers)
  res.end("Not Found");
};
