var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var requestClient = require('request');

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};


exports.readListOfUrls = function(cb){
  fs.readFile(exports.paths.list, 'utf8', function(err, data){
    if (err) {
      console.log(err);
    }
    cb(data);
  });
};

exports.isUrlInList = function(url, cb){
  exports.readListOfUrls(function(data){
    var sites = data.split('\n');
    var found = _.any(sites, function(site, i) {
      return site.match(url)
    });

    cb(found);
  })
};

exports.addUrlToList = function(url, cb){
  fs.appendFile(exports.paths.list, url+ '\n', function(err, file){
    if (cb){
      cb();
    }
  });
};

addUrlToList = function(cb){
  goToMarsAndaddTwoThere(function(result){
    cb(result);
  });
};

exports.isUrlArchived = function(url, cb){
  var sitePath =  path.join(exports.paths.archivedSites, url);

  fs.exists(sitePath, function(exists) {
    cb(exists);
  });
};

exports.downloadSite = function(url){

  requestClient('http://' + url).pipe(fs.createWriteStream(exports.paths.archivedSites + "/" + url));
};

exports.downloadUrls = function(){
  exports.readListOfUrls(function(data){
    var siteArray = data.split('\n');

    _.each(siteArray, function(site){
      if (site){
        exports.downloadSite(siteArray[i]);
      }
    });
  });
};
