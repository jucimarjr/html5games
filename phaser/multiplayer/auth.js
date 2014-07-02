/*global console, io, User*/

var user, socket, id;

function setId(identifier) {
	'use strict';
	id = identifier;
}

function getForm(form) {
	"use strict";
	var i, user;
	user = {login: form.loginfield.value, password: form.passwordfield.value, id: id};
	socket.emit('login try', user);
	form.parentNode.parentNode.removeChild(form.parentNode);
}

socket = io.connect('http://127.0.0.1:3000', {transports: ['websocket']});
socket.on('id', setId);