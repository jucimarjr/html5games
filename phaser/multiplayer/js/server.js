/*global require, console*/

var server, defaultUsers, clients;

function getSocketById(id) {
	'use strict';
	var i, tam = clients.length;
	for (i = 0; i < tam; i = i + 1) {
		if (clients[i].id === id) {
			return clients[i];
		}
	}
	return null;
}

function allocRoom(user) {
	'use strict';
	var socket = getSocketById(user.id);
	socket.join(user.room);
	console.log('logged: ' + user.id + ' in ' + user.room);
}

function onLoginTry(user) {
	'use strict';
	var i, socket, tam = defaultUsers.length;
	for (i = 0; i < tam; i = i + 1) {
		if (defaultUsers[i].login === user.login && defaultUsers[i].password === user.password) {
			user.room = defaultUsers[i].room;
			allocRoom(user);
			server.to(user.id).emit('start game', user.room);
			return;
		}
	}
	console.log('login failed!');
}

function onUserClicked(object) {
	'use strict';
	server.to(object.room).emit('create rectangle', object);
}

function onSocketConnection(socketClient) {
	'use strict';
	socketClient.on('login try', onLoginTry);
	socketClient.on('user clicked!', onUserClicked);
	server.to(socketClient.id).emit('id', socketClient.id);
	console.log(socketClient.id);
	clients.push(socketClient);
	socketClient.on('disconnect', function () {
		var aux, i = clients.indexOf(socketClient);
		aux = clients[0];
		clients[0] = clients[i];
		clients[i] = aux;
		clients.shift();
	});
}

server = require('socket.io')(3000);
defaultUsers = [
	{ login: 'user1', password: '1234', room: '1'},
	{ login: 'user2', password: '2234', room: '1'},
	{ login: 'user3', password: '3234', room: '2'},
	{ login: 'user4', password: '4234', room: '2'},
	{ login: 'user5', password: '5234', room: '3'},
	{ login: 'user6', password: '6234', room: '3'},
	{ login: 'user7', password: '7234', room: '3'},
	{ login: 'user8', password: '8234', room: '3'}
];
clients = [];
server.sockets.on('connection', onSocketConnection);
