var app = require('express')();
var server = require('http').Server(app);
var nunjucks = require('nunjucks');
var io = require('socket.io')(server);
io.on('connection', function() {
  console.log('??');
});

nunjucks.configure('views', {
  express: app
});

app.get('/', function(req, res) {
  nunjucks.render('index.html', function(err, html) {
      res.send(html);
  });
});

var port = process.env.PORT || 8080;
server.listen(port);

console.log('port: ' + port);
