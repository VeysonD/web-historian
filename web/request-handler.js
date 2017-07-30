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

      //check if url is in site.txt
      archive.isUrlInList(url, function(found) {
        if (found) {
          //if yes check if it is archivedSites
          archive.isUrlArchived(url, function(exists) {
            //if yes, redirect to page
            if (exists) {
              httpHelpers.redirect(response, '/' + url);
            } else {
              //if no, redirect to loading
              httpHelpers.redirect(response, '/loading.html');
            }
          });
        } else {
          //if no add to site.txt
          archive.addUrlToList(url, function() {
            httpHelpers.redirect(response, '/loading.html');
          });
        }
      });




    });
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
