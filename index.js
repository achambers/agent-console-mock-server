var app    = require('express')();
var server = require('./server');
var port   = process.env.PORT || 5000;

server(app);

app.listen(port, function() {
  console.log("Node app is running at localhost:" + port)
});
