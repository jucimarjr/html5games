/*global Phaser, io*/

var game, socket;

function createRectangle(object) {
	'use strict';
	var sprite = game.add.sprite(object.x, object.y, 'rectangle');
	sprite.anchor.setTo(0.5, 0.5);
}

function onClick() {
	'use strict';
	var object = {
		x: game.input.position.x,
		y: game.input.position.y
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

socket = io.connect('http://127.0.0.1:3000', {transports: ['websocket']});
socket.on('create rectangle', createRectangle);
game = new Phaser.Game(960, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update});