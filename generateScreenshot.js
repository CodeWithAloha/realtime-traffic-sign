module.exports = {
  'generateScreenshot': function(test) {
      test.open('http://localhost:8080/map')
        .resize({
          width: 500,
          height: 500
        })
        .wait(5000)
        .screenshot('test/map.png');
  }
}
