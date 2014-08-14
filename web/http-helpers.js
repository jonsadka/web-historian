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

exports.sendResponse = function(req, res, statusCode) {
  statusCode = statusCode || 200;
  res.writeHead(statusCode, headers);

  if ( req.url === '/' ){
    var path = 'home';
  } else {
    var path = req.url;
  }

  console.log("Desired url: " + path);
  archive.readListOfUrls(path, function(fullPath) {
    exports.serveAssets(fullPath, res.end);
  });

};

exports.send404 = function(res) {
  statusCode = 404;
  res.writeHead(statusCode, headers)
  res.end("Not Found");
};

exports.serveAssets = function(asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)

  fs.readFile(asset, 'binary', function (err, data) {
    console.log('collected asset: ',asset);
    if(err) { throw err; }
    callback(data);
  });

};


