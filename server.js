//
// node server configuration
 
// set up basic settings...
var host = 'http://idemo',
   hostport = 7360,
   localport = 7360; // note: ports should match the port your Valence instance uses
 
// define server proxy...
var express = require('express');
var app = express();
var httpProxy = require('http-proxy');
var routingProxy = new httpProxy.createProxyServer();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

var valenceProxy = function(req, res) {
       routingProxy.web(req, res, {
           target : host + ':' + hostport
       });
   };
 
// route valence calls through proxy...
app.all('/valence/*', valenceProxy);
app.all('/portal/*', valenceProxy);
app.all('/resources/*', valenceProxy);
app.all('/build/*', valenceProxy);
app.all('/desktop/*', valenceProxy);
app.all('/extjs5/*', valenceProxy);
 
// serve static folders from this local machine...
app.use('/', express.static(__dirname));
 
// begin listening on local port...
app.listen(localport);