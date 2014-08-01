/*global Phaser, socket, console*/

var game, socket, userroom, pieces, pieceWidth, pieceHeight, myPieces, selected;

function createRectangle(objectString) {
	'use strict';
	var sprite, object;
	object = JSON.parse(objectString);
	sprite = game.add.sprite(object.piece.x, object.piece.y, 'pieces');
	sprite.anchor.setTo(0.5, 0.5);
	sprite.angle = object.piece.angle;
	sprite.frame = object.piece.frame;
	pieces.next = object.next;
	pieces[object.array].push(object.piece);
}

function setPiece(x, y, angle) {
	'use strict';
	selected.piece.x = x;
	selected.piece.y = y;
	selected.piece.angle = angle;
	return selected.piece;
}

function isMovePossible(piece, array) {
	'use strict';
	var last = pieces[array].length - 1;
	if (piece.side1 === pieces[array][last][pieces[array][last].freeSide] || piece.side2 === pieces[array][last][pieces[array][last].freeSide]) {
		return true;
	}
	return false;
}

function rotatePiece(piece, array) {
	'use strict';
	var last;
	last = pieces[array].length - 1;
	if (piece.side1 === pieces[array][last].side1 || piece.side2 === pieces[array][last].side2) {
		piece.angle = pieces[array][last].angle + 180;
		piece.freeSide = piece.side1 === pieces[array][last].side1 ? 'side2' : 'side 1';
	} else if (piece.side1 === pieces[array][last].side2 || piece.side2 === pieces[array][last].side1) {
		piece.angle = pieces[array][last].angle;
		piece.freeSide = piece.side1 === pieces[array][last].side2 ? 'side2' : 'side 1';
	}
	if (piece.side1 === piece.side2 && (piece.side1 === pieces[array][last].side1 || piece.side1 === pieces[array][last].side2)) {
		piece.angle = pieces[array][last].angle + 90;
	} else if (pieces[array][last].side1 === pieces[array][last].side2 && (pieces[array][last].side1 === piece.side1 || pieces[array][last].side1 === piece.side2)) {
		if (piece.side1 === pieces[array][last - 1].side1 || piece.side2 === pieces[array][last - 1].side2) {
			piece.angle = pieces[array][last].angle + 180;
		} else if (piece.side1 === pieces[array][last - 1].side2 || piece.side2 === pieces[array][last - 1].side1) {
			piece.angle = pieces[array][last].angle;
		}
	}
}

function playPiece2(object) {
	'use strict';
	if (Phaser.Point.distance(object, pieces.next.top) > Phaser.Point.distance(object, pieces.next.bottom)) {
		object.piece = setPiece(pieces.next.bottom.x, pieces.next.bottom.y, pieces.next.bottom.angle);
		object.array = 'bottom';
		if (!isMovePossible(object.piece, object.array)) {
			return false;
		}
		pieces.next.bottom.y += pieceHeight;
	} else {
		object.piece = setPiece(pieces.next.top.x, pieces.next.top.y, pieces.next.top.angle);
		object.array = 'top';
		if (!isMovePossible(object.piece, object.array)) {
			return false;
		}
		pieces.next.top.y -= pieceHeight;
	}
	rotatePiece(object.piece, object.array);
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
		object.piece = setPiece(pieces.next.top.x, pieces.next.top.y, pieces.next.top.angle);
		object.array = 'top';
		if (!isMovePossible(object.piece, object.array)) {
			return false;
		}
		pieces.next.top.y -= pieceHeight;
	} else if ((dBottom <= dTop && dBottom <= dLeft && dBottom <= dRight)) {
		object.piece = setPiece(pieces.next.bottom.x, pieces.next.bottom.y, pieces.next.bottom.angle);
		object.array = 'bottom';
		if (!isMovePossible(object.piece, object.array)) {
			return false;
		}
		pieces.next.bottom.y += pieceHeight;
	} else if ((dRight <= dTop && dRight <= dLeft && dRight <= dBottom)) {
		object.piece = setPiece(pieces.next.right.x, pieces.next.right.y, pieces.next.right.angle);
		object.array = 'right';
		if (!isMovePossible(object.piece, object.array)) {
			return false;
		}
		pieces.next.right.x += pieceHeight;
	} else {
		object.piece = setPiece(pieces.next.left.x, pieces.next.left.y, pieces.next.left.angle);
		object.array = 'left';
		if (!isMovePossible(object.piece, object.array)) {
			return false;
		}
		pieces.next.left.x -= pieceHeight;
	}
	rotatePiece(object.piece, object.array);
	object.next = pieces.next;
	return object;
}

function onClick() {
	'use strict';
	if (!selected.enabled) {
		return;
	}
	selected.enabled = false;
	var object = {
		x: game.input.position.x,
		y: game.input.position.y,
		room: userroom
	};
	if (pieces.top.length <= 1 || pieces.bottom.length <= 1) {
		object = playPiece2(object);
	} else {
		object = playPiece4(object);
	}
	if (!object) {
		console.log('move refused');
		return;
	}
	socket.emit('user clicked!', JSON.stringify(object));
}

function playSixSix() {
	'use strict';
	var sprite;
	sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'pieces');
	sprite.frame = 0;
	sprite.anchor.setTo(0.5, 0.5);
	sprite.angle = 90;
}

function indexOfFrame(frame) {
	'use strict';
	var i;
	for (i = 0; i < myPieces.length; i = i + 1) {
		if (myPieces[i].frame === frame) {
			return i;
		}
	}
	return null;
}

function select(sprite, e) {
	'use strict';
	selected.piece = myPieces[indexOfFrame(sprite.frame)];
	selected.sprite = sprite;
	selected.enabled = true;
}

function showMyPieces() {
	'use strict';
	var i, x, y, sprite;
	x = game.world.centerX - 3 * pieceWidth;
	y = game.height - pieceHeight / 2;
	for (i = 0; i < myPieces.length; i = i + 1) {
		if (myPieces[i].side1 !== 6 || myPieces[i].side2  !== 6) {
			sprite = game.add.sprite(x, y, 'pieces');
			sprite.frame = myPieces[i].frame;
			sprite.anchor.setTo(0.5, 0.5);
			x = x + pieceWidth;
			sprite.inputEnabled = true;
			sprite.events.onInputDown.add(select);
		}
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
	playSixSix();
	game.stage.backgroundColor = "#ffffff";
	game.input.onDown.add(onClick);
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
	pieces.top.push({side1: 6, side2: 7, angle: 0, freeSide: 'side1'});
	pieces.bottom.push({side1: 6, side2: 7, angle: 180, freeSide: 'side1'});
	pieces.left.push({side1: 6, side2: 7, angle: 270, freeSide: 'side1'});
	pieces.right.push({side1: 6, side2: 7, angle: 90, freeSide: 'side1'});
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

selected = {};
socket.on('create rectangle', createRectangle);
socket.on('start game', start);