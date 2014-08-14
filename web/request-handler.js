var path = require('path');
var httpHelp = require("./http-helpers");
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

var handleCORS = function(req, res) {
  httpHelp.getResponse(res);
};

var postRequest = function(req, res) {
  httpHelp.postResponse(req, res);
};

var getRequest = function(req, res) {
  httpHelp.getResponse(req, res);
};

actionMap = {
  'GET': getRequest,
  'POST': postRequest,
  'OPTIONS': handleCORS
};

exports.handleRequest = function (req, res) {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  var action = actionMap[req.method];

  if( action ) {
    action(req, res);
  } else {
    httpHelp.send404(res);
  }

};
