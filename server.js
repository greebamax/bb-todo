var finalhandler = require('finalhandler'),
    http = require('http'),
    serveStatic = require('serve-static');

var serveApp = serveStatic('public');

var server = http.createServer(function(req, res) {
  var done = finalhandler(req, res, {
    onerror: logerror
  });

  serveApp(req, res, done);
});

function logerror(err) {
  console.error(err.stack || err.toString());
}

server.listen(3000);
