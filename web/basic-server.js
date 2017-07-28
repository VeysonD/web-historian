var http = require('http');
var handler = require('./request-handler');
var initialize = require('./initialize.js');

// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize('./archives');
//console.log('handler', handler.handleRequest);
var port = 8080;
var ip = '127.0.0.1';
var server = http.createServer(handler.handleRequest);
//console.log(module);


if (module.parent) {
  //console.log('Parent exists', module);
  module.exports = server;
} else {
  //console.log('Parent doesnt exist', module);
  server.listen(port, ip);
  console.log('Listening on http://' + ip + ':' + port);
}
//
/*




*/
