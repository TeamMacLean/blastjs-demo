var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var API = require('./controllers/api');
var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));


app.get('/', function (req, res) {
  return res.sendFile(path.join(__dirname, 'views', '/index.html'));
});

app.get('/dbs', API.getDBs);
app.all('/blast', API.blast);


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});