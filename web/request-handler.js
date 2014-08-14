var path = require('path');
var httpHelp = require("./http-helpers");
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

var handleCORS = function(req, res) {
  httpHelp.sendResponse(res);
};

var addToArchive = function(req, res) {
  // console.log('POST REQUEST CALLED??');
};

var getFromArchive = function(req, res) {
  // console.log('GET REQUEST CALLED');
  httpHelp.sendResponse(req, res);
  // console.log('GET REQUEST ENDED');
};

var actionMap = {
  'GET': getFromArchive,
  'POST': addToArchive,
  'OPTIONS': handleCORS
};

exports.handleRequest = function (req, res) {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  //res.end(archive.paths.list);
  var action = actionMap[req.method];
  if(action) {
    action(req, res);
  } else {
    httpHelp.send404(res);
  }
};
