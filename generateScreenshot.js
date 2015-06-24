var Horseman = require('node-horseman');

function generateImage() {
  var hm = new Horseman({
    ignoreSSLErrors: false
  });
  console.log('starting');
  var site = hm.open('http://localhost:8080/map');
  var status = site.status();
  if(status == 200) {
    hm.viewport(500, 500);
    hm.screenshot('images/map.png');
  } else {
    console.log('error');
  }
  hm.close();
}
generateImage()
