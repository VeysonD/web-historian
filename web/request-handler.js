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

// exports.handleRequest = function (req, res) {
//   console.log('Handle request running');
//   var statusCode;
//   var notFound;
//   if ( req.method === 'GET' ) {
//     //console.log('request', req.url);
//     //console.log('url', url.parse(req.url));
//     console.log('GET request running');
//     var asset;
//     if (req.url === '/') {
//       console.log('GET Homepage');
//       asset = archive.paths.siteAssets + '/index.html';
//       statusCode = 200;
//       res.writeHead(statusCode);
//       httpHelpers.serveAssets(res, asset);

//     } else {
//       console.log('GET Archive');
//       var asset = url.parse(req.url).pathname;
//       //this is where we do our GET request
//       //if archive website is not found
//         //set notFound =true;

//       httpHelpers.serveAssets(res, asset, function(err, data) {
//         if (err) {
//           throw err;
//         }
//       }); //callback function??

//     }






//     if (notFound === true) {
//       console.log('This is an invalid path');
//       statusCode = 404;
//       res.writeHead(statusCode);
//       res.end('u 404ed');
//     }
//   }
//   console.log('Finished handle request');
// };
