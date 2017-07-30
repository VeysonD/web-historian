var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', function(err, sites) {
    if (err) {
      console.log('There was an error', err);
      throw err;
    }
    //console.log('sites before join', sites);
    sites = sites.toString().split('\n');
    //console.log('sites after join', sites);
    callback(sites);
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(urlArray) {
    callback(urlArray.indexOf(url) !== -1);
  });

};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url + '\n', function (err) {
    if (err) {
      throw err;
    }
    console.log(`Url: ${url} has been saved for archiving`);
    callback();
  });
};

exports.isUrlArchived = function(url, callback) {
  //console.log('isUrlArchived? url', url);
  fs.readdir(exports.paths.archivedSites, function(err, files) {
    callback(files.indexOf(url) !== -1);
  });

};

exports.downloadUrls = function(urls) {
  //only download urls here;
  //console.log(urls);
  urls.forEach(function(url) {
    console.log('url', url);
    request('http://' + url).pipe(fs.createWriteStream(exports.paths.archivedSites + '/' + url));
  });
};
