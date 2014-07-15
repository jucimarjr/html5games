/*global console, io, User*/

var user, socket, id;

function setId(identifier) {
	'use strict';
	id = identifier;
}

function login() {
	'use strict';
	var i;
	user = {login: document.getElementById('loginfield').value, password: document.getElementById('passwordfield').value, id: id};
	socket.emit('login try', user);
	document.getElementById('everything').parentNode.removeChild(document.getElementById('everything'));
}

socket = io.connect('http://127.0.0.1:3000', {transports: ['websocket']});
socket.on('id', setId);