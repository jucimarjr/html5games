/*global require, console*/

var server;

function onUserClicked(object) {
	'use strict';
	server.sockets.emit('create rectangle', object);
}

function onSocketConnection(socketClient) {
	'use strict';
	socketClient.on('user clicked!', onUserClicked);
}

server = require('socket.io')(3000);
server.sockets.on('connection', onSocketConnection);
