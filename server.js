var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var users = [];
var connections = [];

var port = process.env.PORT || 3000;
server.listen(port);
console.log('Server started at port: ' + port);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
})