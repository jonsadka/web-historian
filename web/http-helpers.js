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

  // console.log("Desired url: " +req.url);
  if ( req.url === '/' ){
    var path = 'home';
  } else {
    var path = req.url;
  }

  this.serveAssets(res, path, res.end);

};

exports.send404 = function(res) {
  exports.sendResponse(res, "Not Found", 404);
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
  var collectedAsset = archive.readListOfUrls(asset)

  fs.readFile(collectedAsset, 'binary', function (err, data) {
    if(err) { throw err; }
    callback(data);
  });

};


