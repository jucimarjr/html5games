/*global Phaser, socket*/

var game, socket, userroom;

function createRectangle(object) {
	'use strict';
	var sprite = game.add.sprite(object.x, object.y, 'rectangle');
	sprite.anchor.setTo(0.5, 0.5);
}

function onClick() {
	'use strict';
	var object = {
		x: game.input.position.x,
		y: game.input.position.y,
		room: userroom
	};
	socket.emit('user clicked!', object);
}

function preload() {
	'use strict';
	game.load.image('rectangle', 'rectangle.png');
}

function create() {
	'use strict';
	game.input.onDown.add(onClick);
}

function update() {
	'use strict';
	game.scale.setExactFit();
	game.scale.refresh();
}

function start(room) {
	'use strict';
	userroom = room;
	game = new Phaser.Game(960, 600, Phaser.AUTO, 'game', {preload: preload, create: create, update: update});
}

socket.on('create rectangle', createRectangle);
socket.on('start game', start);