var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var users = [];
var connections = [];

var port = process.env.PORT || 3000;
server.listen(port);
console.log('Server started at port: ' + port);

app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    connections.push(socket);
    console.log('Connection, current size is: ' + connections.length);

    socket.on('disconnect', function(data) {
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnection, current size is: ' + connections.length);
    });

    socket.on('send-message', function(data) {
        console.log(data);
        io.emit('new-message', { msg: data });
    });
});