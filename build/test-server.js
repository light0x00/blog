var net = require('net');
var listenPort = 8080;

var server = net.createServer(function (socket) {

    socket.setEncoding('utf-8');

    socket.on('data', function (data) {
        console.log('client send:' + data);
    });

 
}).listen(listenPort);

