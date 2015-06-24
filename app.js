var app = require('express')();
var server = require('http').Server(app);
var nunjucks = require('nunjucks');
var Pageres = require('pageres');
var spawn = require('child_process').spawn;
var fs = require('fs');

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

app.get('/map', function(req, res) {
  nunjucks.render('map.html', function(err, html) {
    res.send(html);
  });
});

function generateImage() {
  console.log('spawn');
  var child = spawn('dalek', ['generateScreenshot.js', '-b', 'chrome']);
  child.on('error', function (err) {
      console.log(err);
  });
  child.on('close', function(code, signal) {
    var paperjs = require('paper');

    paperjs.setup(new paperjs.Canvas(500, 500));

    var img = new paperjs.Raster({
      source: "images/map.png"
    });

    img.onLoad = function() {
      var width = img.width;
      var height = img.height;

      var i,j;
      for(i=0; i < height; i++) {
        for(j=0; j < width; j++) {
          var pxl = img.getPixel(j, i);
          console.log('pixel at ' + j + ', ' + i + ": " + pxl.toCSS() );
        }
      }

    };
  });
}

setInterval(generateImage, 10000);

var port = process.env.PORT || 8080;
server.listen(port, function() {
  console.log('port: ' + port);
  // generateImage();
});
