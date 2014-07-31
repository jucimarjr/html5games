/*global Phaser, socket, console*/

var game, socket, userroom, pieces, pieceWidth, pieceHeight, myPieces;

function createRectangle(object) {
	'use strict';
	var sprite = game.add.sprite(object.piece.x, object.piece.y, 'rectangle');
	sprite.anchor.setTo(0.5, 0.5);
	sprite.angle = object.piece.angle;
	pieces.next = object.next;
	pieces[object.array].push(object.piece);
}

function createPiece(x, y, angle) {
	'use strict';
	return ({x: x, y: y, angle: angle});
}

function playPiece2(object) {
	'use strict';
	if (Phaser.Point.distance(object, pieces.next.top) > Phaser.Point.distance(object, pieces.next.bottom)) {
		object.piece = createPiece(pieces.next.bottom.x, pieces.next.bottom.y, pieces.next.bottom.angle);
		object.array = 'bottom';
		pieces.next.bottom.y += pieceHeight;
	} else {
		object.piece = createPiece(pieces.next.top.x, pieces.next.top.y, pieces.next.top.angle);
		object.array = 'top';
		pieces.next.top.y -= pieceHeight;
	}
	object.next = pieces.next;
	return object;
}

function playPiece4(object) {
	'use strict';
	var dTop, dBottom, dLeft, dRight;
	dTop = Phaser.Point.distance(object, pieces.next.top);
	dBottom = Phaser.Point.distance(object, pieces.next.bottom);
	dLeft = Phaser.Point.distance(object, pieces.next.left);
	dRight = Phaser.Point.distance(object, pieces.next.right);
	if (dTop <= dBottom && dTop <= dLeft && dTop <= dRight) {
		object.piece = createPiece(pieces.next.top.x, pieces.next.top.y, pieces.next.top.angle);
		object.array = 'top';
		pieces.next.top.y -= pieceHeight;
	} else if ((dBottom <= dTop && dBottom <= dLeft && dBottom <= dRight)) {
		object.piece = createPiece(pieces.next.bottom.x, pieces.next.bottom.y, pieces.next.bottom.angle);
		object.array = 'bottom';
		pieces.next.bottom.y += pieceHeight;
	} else if ((dRight <= dTop && dRight <= dLeft && dRight <= dBottom)) {
		object.piece = createPiece(pieces.next.right.x, pieces.next.right.y, pieces.next.right.angle);
		object.array = 'right';
		pieces.next.right.x += pieceHeight;
	} else {
		object.piece = createPiece(pieces.next.left.x, pieces.next.left.y, pieces.next.left.angle);
		object.array = 'left';
		pieces.next.left.x -= pieceHeight;
	}
	object.next = pieces.next;
	return object;
}

function onClick() {
	'use strict';
	var object = {
		x: game.input.position.x,
		y: game.input.position.y,
		room: userroom
	};
	if (pieces.top.length === 0 || pieces.bottom.length === 0) {
		object = playPiece2(object);
	} else {
		object = playPiece4(object);
	}
	socket.emit('user clicked!', object);
}


function showMyPieces() {
	'use strict';
	var i, x, y, sprite;
	x = game.world.centerX - 3 * pieceWidth;
	y = game.height - pieceHeight / 2;
	for (i = 0; i < myPieces.length; i = i + 1) {
		sprite = game.add.sprite(x, y, 'pieces');
		sprite.frame = myPieces[i].frame;
		sprite.anchor.setTo(0.5, 0.5);
		x = x + pieceWidth;
	}
}

function preload() {
	'use strict';
	game.load.image('rectangle', 'assets/images/rectangle.png');
	game.load.spritesheet('pieces', 'assets/spritesheets/domino.png', 30, 60);
}

function create() {
	'use strict';
    showMyPieces();
	game.stage.backgroundColor = "#ffffff";
	game.input.onDown.add(onClick);
	var sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'rectangle');
	sprite.anchor.setTo(0.5, 0.5);
	sprite.angle = 90;
	pieces = {
		top: [],
		bottom: [],
		left: [],
		right: [],
		next: {
			top: {x: game.world.centerX, y: game.world.centerY - (pieceHeight / 2 + pieceWidth / 2), angle: 0},
			bottom: {x: game.world.centerX, y: game.world.centerY + (pieceHeight / 2 + pieceWidth / 2), angle: 0},
			left: {x: game.world.centerX - pieceHeight, y: game.world.centerY, angle: 90},
			right: {x: game.world.centerX + pieceHeight, y: game.world.centerY, angle: 90}
		}
	};
}

function update() {
	'use strict';
	game.scale.setExactFit();
	game.scale.refresh();
}

function start(dataString) {
	'use strict';
	var data = JSON.parse(dataString);
	userroom = data.room;
	myPieces = data.pieces;
	pieceHeight = 60;
	pieceWidth = 30;
	game = new Phaser.Game(960, 600, Phaser.AUTO, 'game', {preload: preload, create: create, update: update});
}

socket.on('create rectangle', createRectangle);
socket.on('start game', start);