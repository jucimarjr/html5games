/*global require, console, Peca*/

var server, defaultUsers, clients, pecas, userpieces, roomCounter;

var Peca = function (s1, s2, frame) {
	'use strict';
	this.frame = frame;
	this.side1 = s1;
	this.side2 = s2;
};

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
	roomCounter[parseInt(user.room, 10)] = roomCounter[parseInt(user.room, 10)] + 1;
	console.log('logged: ' + user.id + ' in ' + user.room);
}

function onLoginTry(user) {
	'use strict';
	var i, tam = defaultUsers.length, data = {};
	for (i = 0; i < tam; i = i + 1) {
		if (defaultUsers[i].login === user.login && defaultUsers[i].password === user.password) {
			user.room = defaultUsers[i].room;
			data.room = user.room;
			data.pieces = userpieces[roomCounter[parseInt(user.room, 10)]];
			allocRoom(user);
			server.to(user.id).emit('start game', JSON.stringify(data));
			return;
		}
	}
	console.log('login failed!');
}

function onUserClicked(objectString) {
	'use strict';
	server.to(JSON.parse(objectString).room).emit('create rectangle', objectString);
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
	{ login: 'user1', password: '1234', room: '0'},
	{ login: 'user2', password: '2234', room: '0'},
	{ login: 'user3', password: '3234', room: '1'},
	{ login: 'user4', password: '4234', room: '1'},
	{ login: 'user5', password: '5234', room: '2'},
	{ login: 'user6', password: '6234', room: '2'},
	{ login: 'user7', password: '7234', room: '2'},
	{ login: 'user8', password: '8234', room: '2'}
];
pecas = [[6, 6], [6, 5], [6, 4], [6, 3], [6, 2], [6, 1], [6, 0],
        [5, 5], [5, 4], [5, 3], [5, 2], [5, 1], [5, 0], [4, 4],
        [4, 3], [4, 2], [4, 1], [4, 0], [3, 3], [3, 2], [3, 1],
        [3, 0], [2, 2], [2, 1], [2, 0], [1, 1], [1, 0], [0, 0]];
userpieces = [[], [], [], []];
var frame = 0, i, j;
for (j = 0; j < 4; j = j + 1) {
	for (i = 0; i < 7; i = i + 1) {
		var peca = new Peca(pecas[frame][0], pecas[frame][1], frame);
		userpieces[j].push(peca);
		frame = frame + 1;
	}
}
for (i = 0; i < userpieces.length; i = i + 1) {
	for (j = 0; j < userpieces[0].length; j = j + 1) {
		var k = Math.floor(Math.random() * 3);
		var l = Math.floor(Math.random() * 7);
		var temp = userpieces[i][j];
		userpieces[i][j] = userpieces[k][l];
		userpieces[k][l] = temp;
	}
}
clients = [];
roomCounter = [0, 0, 0];
server.sockets.on('connection', onSocketConnection);