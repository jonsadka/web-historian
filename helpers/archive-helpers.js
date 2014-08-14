var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt'),
  'home': path.join(__dirname, '../web/public/index.html')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

exports.readListOfUrls = function(req, res, asset, callback, failCallback){
  // is the url in the list?
  if( asset === 'home') {
    callback(exports.paths['home']);
  } else {
    // if in list, return the asset
    exports.isUrlInList( asset, function(data){
      var listArray = data.toString().split('\n');
      for ( var i = 0; i < listArray.length; i++ ){
        if ( listArray[i] === asset ){
          callback(exports.paths['archivedSites'] + asset);
        } else {
          // if not found, do something else;
          failCallback(req, res);
        }
      }
    });
  }
};

exports.isUrlInList = function(asset, callback){
  fs.readFile(exports.paths['list'], 'binary', function(err, data) {
    if(err) { throw err; }
    callback(data);
  });
};

exports.addUrlToList = function(req, res, asset, callback){
  fs.writeFile(exports.paths['list'], asset.substring(1), function(err, data) {
    if(err) { throw err; }
    console.log('success!');
    callback(data);
  });
};

exports.isURLArchived = function(asset){
  // var fullPath = exports.paths['archivedSites'] + asset;
  // console.log("Full Path : " + fullPath);
  // fs.exists( fullPath , function(exists) {
  //   if (exists) {
  //     console.log('Exists');
  //     return true;
  //   }
  // });
};

exports.downloadUrls = function(asset){
  console.log('Download Beginning');
};
