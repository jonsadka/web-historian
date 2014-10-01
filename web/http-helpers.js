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

var bodyParser = function(req, res, cb) {
  var postBody = '';
  req.on('data', function(chunk){
    postBody += chunk;
  });
  req.on('end', function(){
    cb(postBody);
  });
};

var serveAsset = function(res, asset, cb){
  fs.readFile(archive.paths.siteAssets + asset, function(err, contents){
    if (!err && contents) {
      sendResponse(res, contents);
      return;
    }

    fs.readFile(archive.paths.archivedSites + asset, function(err, contents){
      if (!err && contents){
        sendResponse(res, contents);
        return;
      }

      if (cb){
        cb();
        return;
      }

      send404(res);
    });
  });
};


var sendResponse = function(response, data, status){
  status = status || 200;
  response.writeHead(status, headers);
  response.end(data);
};

var sendRedirect = function(res, url) {
  res.writeHead(a, { Location: 'http://127.0.0.1:8080/' + url });
  res.end();
};

var send404 = function(response){

  exports.sendResponse(response, '404: Page not found', 404);
};

exports.bodyParser = bodyParser;
exports.serveAsset = serveAsset;
exports.sendResponse = sendResponse;
exports.send404 = send404;
exports.sendRedirect = sendRedirect;



/* scroll down for BONUS IMPLEMENTATIONS of the asset serving function! */

























exports.serveAssetQ1 = function(res, asset) {
  var encoding = {encoding: 'utf8'};
  var readFile = Q.denodeify(fs.readFile);
  // read up on this denodeify function if you get a chance!
  // it is specifically designed to work with Node or Node-style
  // functions that take a callback with `err, result`
  // passed in as the two parameters.
  // if you're using bluebird, it has a `.promisify`
  // method that does basically the same thing


  readFile(archive.paths.siteAssets + asset, encoding)
    .then(function(contents) {
      contents && sendResponse(res, contents);
    }, function(err) {
      return readFile(archive.paths.archivedSites + asset, encoding);
    })
    .then(function(contents) {
      contents && sendResponse(res, contents);
    }, function(err) {
      exports.send404(res);
    });
};

exports.serveAssetQ2 = function(res, asset) {
  var encoding = {encoding: 'utf8'};
  var readFile = Q.denodeify(fs.readFile);

  var assetPaths = [
    archive.paths.siteAssets,
    archive.paths.archivedSites
  ];

// recursive promise loop!
  var sendAsset = function(paths){
    return readFile(paths.pop()+asset, encoding)
      .then(function(contents) {
        return sendResponse(res, contents);
      })
      .catch(function(err) {
        return paths.length ? sendAsset(paths) : send404(res);
      });
  }

  return sendAsset(assetPaths);
};

