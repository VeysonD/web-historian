var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

  console.log('Serve assets running');
  fs.readFile(archive.paths.siteAssets + asset, 'utf8', function(err, data) {

    if (err) {
      fs.readFile(archive.paths.archivedSites + asset, 'utf8', function(err, data) {
        //console.log('ARCHIVE + GOOGLE', archive.paths.archivedSites + asset );

        if (err) {
          if (callback) {
            //console.log('callback running');
            callback();
          } else {
            console.log('this is not archived');
            res.writeHead(404);
            res.end('404');
          }
        } else {
          res.writeHead(200);
          res.end(data);
        }
      });
    } else {
      res.writeHead(200);
      res.end(data);
    }

  });
};

exports.assembleData = function(request, callback) {
  var body = '';
  request.on('data', function(data) {
    body += data;
  });
  request.on('end', function() {
    callback(body);
  });

};

exports.redirect = function(response, url) {
  response.writeHead(302, {Location: url});
  response.end();
};
