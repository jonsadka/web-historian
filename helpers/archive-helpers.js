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

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(asset){
  // is the url in the list?
  if( asset === 'home') {
    return exports.paths['home'];
  }

  //
    //  No: archive the url, download it and return it
    //  YES: is url archived?
      //    Yes: return the archive
      //    No: download url and then return
};

exports.isUrlInList = function(){

};

exports.addUrlToList = function(){
};

exports.isURLArchived = function(asset){
};

exports.downloadUrls = function(){
};
