var app    = require('express')();
var cors   = require('cors');
var server = require('./server');
var port   = process.env.PORT || 5000;

app.use(cors());

server(app);

app.listen(port, function() {
  console.log("Node app is running at localhost:" + port)
});
