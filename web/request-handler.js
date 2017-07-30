var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var initialize = require('../web/initialize.js');
var httpHelpers = require('./http-helpers.js');
var url = require('url');
// require more modules/folders here!

var actions = {
  'GET': function(request, response) {
    var parts = url.parse(request.url);
    var urlPath = parts.pathname === '/' ? '/index.html' : parts.pathname;
    //console.log('Just to check argle bargle', urlPath);
    httpHelpers.serveAssets(response, urlPath, function() {
      response.writeHead(404, httpHelpers.headers);
      response.end('404 website not found');
    });
  },
  'POST': function(request, response) {
    //console.log('post request', request);
    httpHelpers.assembleData(request, function(url) {
      console.log('pre-split url', url);
      var url = url.split('=')[1];//.replace('http://', '');
      console.log('assembled data', url);
      archive.addUrlToList(url, function() {
        httpHelpers.redirect(response, '/loading.html');
      });

      
      //check if url is in site.txt
        //if yes check if it is archivedSites
          //if yes, display page
          //if no, display loading
        //if no add to site.txt
    });
    //console.log('post response', response);
  }
};

exports.handleRequest = function(request, response) {

  var action = actions[request.method];

  if (action) {
    action(request, response);
  } else {
    response.writeHead(404, httpHelpers.headers);
    response.end('404 website not found');
  }
};
