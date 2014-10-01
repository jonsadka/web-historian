var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var fs = require('fs');
var url = require('url');

var getHandler = function(req, res){
  pathname = url.parse(req.url).pathname;

  if (pathname === '/'){
    pathname = '/index.html';
  }

  httpHelpers.serveAsset(res, pathname, function(){
    archive.isUrlInList(pathname.slice(1), function(isInList){
      if (isInList){
        httpHelpers.sendRedirect(res, 'loading.html');
      } else {
        httpHelpers.send404(res);
      }
    });
  });
};

var postHandler = function(req, res){
  httpHelpers.bodyParser(req, res, function(data){
    // url is received as a key/value string: 'url=www.zombo.com'
    var url = data.split('=')[1];
    archive.isUrlArchived(url, function(isArchived){
      if (isArchived){
        httpHelpers.sendRedirect(res, url);
        return;
      }

      archive.isUrlInList(url, function(isInList){
        if (!isInList)  {
          archive.addUrlToList(url);
        }

        httpHelpers.sendRedirect(res, 'loading.html');
      });
    });
  });
};


var handleRequest = function (req, res) {
  var router = {
    'GET' : getHandler,
    'POST' : postHandler
  };

  if (router[req.method]) {
    router[req.method](req, res);
  } else {
    httpHelpers.send404(res);
  }
};

exports.handleRequest = handleRequest;
