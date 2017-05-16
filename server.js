console.log('server is starting');

var express = require('express');

var app = express();

var server = app.listen(3000, listening);

function listening() {
  console.log('listening at port 3000...');
}

app.use(express.static('bin'));
