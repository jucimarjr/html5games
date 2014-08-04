/*global Phaser, socket, console*/

var game, socket, userroom, pieces, pieceWidth, pieceHeight, myPieces, selected, hint;


function countCarroca(array, branch) {
	'use strict';
	var i, counter = 0, size = pieces[array].length;
	for (i = 0; i < size; i = i + 1) {
		if (pieces[array][i].side1 === pieces[array][i].side2 && pieces[array][i].branch === branch) {
			counter = counter + 1;
		}
	}
	return counter;
}

function calculateRotationMoment(array) {
	'use strict';
	if (pieces.grow[array] === 'top' && countCarroca(array, pieces.branch[array]) === 2) {
		pieces.numberRotate[array][0] = pieces.numberRotate[array][0] + 1;
	} else if (pieces.grow[array] === 'right' && countCarroca(array, pieces.branch[array]) === 1) {
		pieces.numberRotate[array][0] = pieces.numberRotate[array][0] + 1;
	} else if (pieces.grow[array] === 'left' && countCarroca(array, pieces.branch[array]) === 1) {
		pieces.numberRotate[array][0] = pieces.numberRotate[array][0] + 1;
	} else if (pieces.grow[array] === 'bottom' && countCarroca(array, pieces.branch[array]) === 2) {
		pieces.numberRotate[array][0] = pieces.numberRotate[array][0] + 1;
	}
}

function rotateNextPosition() {
	'use strict';
	var i, arrays;
	arrays = ['top', 'right', 'bottom', 'left'];
	for (i = 0; i < 4; i = i + 1) {
		if (pieces.numberRotate[arrays[i]].length > 0 && pieces[arrays[i]].length === pieces.numberRotate[arrays[i]][0]) {
			pieces.numberRotate[arrays[i]][1] += pieces.numberRotate[arrays[i]][0];
			pieces.numberRotate[arrays[i]].shift();
			pieces.angle[arrays[i]] = pieces.angle[arrays[i]] + 90;
			if (pieces.grow[arrays[i]] === 'left') {
				pieces.next[arrays[i]].x = pieces.next[arrays[i]].x + pieceHeight / 2 + pieceWidth / 2;
				pieces.next[arrays[i]].y = pieces.next[arrays[i]].y - pieceWidth / 2 - pieceHeight / 2;
				if (pieces[arrays[i]][pieces[arrays[i]].length - 1].side1 === pieces[arrays[i]][pieces[arrays[i]].length - 1].side2) {
					pieces.next[arrays[i]].y = pieces.next[arrays[i]].y - pieceHeight / 4;
				}
			} else if (pieces.grow[arrays[i]] === 'top') {
				pieces.next[arrays[i]].x = pieces.next[arrays[i]].x + pieceHeight / 2 + pieceWidth / 2;
				pieces.next[arrays[i]].y = pieces.next[arrays[i]].y + pieceWidth / 2 + pieceHeight / 2;
				if (pieces[arrays[i]][pieces[arrays[i]].length - 1].side1 === pieces[arrays[i]][pieces[arrays[i]].length - 1].side2) {
					pieces.next[arrays[i]].x = pieces.next[arrays[i]].x + pieceHeight / 4;
				}
			} else if (pieces.grow[arrays[i]] === 'right') {
				pieces.next[arrays[i]].x = pieces.next[arrays[i]].x - pieceHeight / 2 - pieceWidth / 2;
				pieces.next[arrays[i]].y = pieces.next[arrays[i]].y + pieceWidth / 2 + pieceHeight / 2;
				if (pieces[arrays[i]][pieces[arrays[i]].length - 1].side1 === pieces[arrays[i]][pieces[arrays[i]].length - 1].side2) {
					pieces.next[arrays[i]].y = pieces.next[arrays[i]].y + pieceHeight / 4;
				}
			} else {
				pieces.next[arrays[i]].x = pieces.next[arrays[i]].x - pieceHeight / 2 - pieceWidth / 2;
				pieces.next[arrays[i]].y = pieces.next[arrays[i]].y - pieceWidth / 2 - pieceHeight / 2;
				if (pieces[arrays[i]][pieces[arrays[i]].length - 1].side1 === pieces[arrays[i]][pieces[arrays[i]].length - 1].side2) {
					pieces.next[arrays[i]].x = pieces.next[arrays[i]].x - pieceHeight / 4;
				}
			}
			pieces.grow[arrays[i]] = arrays[(arrays.indexOf(pieces.grow[arrays[i]]) + 1) % arrays.length];
			pieces.branch[arrays[i]] = pieces.branch[arrays[i]] + 1;
		}
	}
}

function rotateCounterClock() {
	'use strict';
	var i, arrays;
	arrays = ['top', 'left', 'bottom', 'right'];
	for (i = 0; i < 4; i = i + 1) {
		if (pieces.numberRotate[arrays[i]].length > 0 && pieces[arrays[i]].length === pieces.numberRotate[arrays[i]][0]) {
			pieces.numberRotate[arrays[i]][1] += pieces.numberRotate[arrays[i]][0];
			pieces.numberRotate[arrays[i]].shift();
			pieces.angle[arrays[i]] = pieces.angle[arrays[i]] - 90;
			if (pieces.grow[arrays[i]] === 'right') {
				pieces.next[arrays[i]].x = pieces.next[arrays[i]].x - pieceHeight / 2 - pieceWidth / 2;
				pieces.next[arrays[i]].y = pieces.next[arrays[i]].y - pieceWidth / 2 - pieceHeight / 2;
				if (pieces[arrays[i]][pieces[arrays[i]].length - 1].side1 === pieces[arrays[i]][pieces[arrays[i]].length - 1].side2) {
					pieces.next[arrays[i]].y = pieces.next[arrays[i]].y - pieceHeight / 4;
				}
			} else if (pieces.grow[arrays[i]] === 'bottom') {
				pieces.next[arrays[i]].x = pieces.next[arrays[i]].x + pieceHeight / 2 + pieceWidth / 2;
				pieces.next[arrays[i]].y = pieces.next[arrays[i]].y - pieceWidth / 2 - pieceHeight / 2;
				if (pieces[arrays[i]][pieces[arrays[i]].length - 1].side1 === pieces[arrays[i]][pieces[arrays[i]].length - 1].side2) {
					pieces.next[arrays[i]].x = pieces.next[arrays[i]].x + pieceHeight / 4;
				}
			} else if (pieces.grow[arrays[i]] === 'left') {
				pieces.next[arrays[i]].x = pieces.next[arrays[i]].x + pieceHeight / 2 + pieceWidth / 2;
				pieces.next[arrays[i]].y = pieces.next[arrays[i]].y + pieceWidth / 2 + pieceHeight / 2;
				if (pieces[arrays[i]][pieces[arrays[i]].length - 1].side1 === pieces[arrays[i]][pieces[arrays[i]].length - 1].side2) {
					pieces.next[arrays[i]].y = pieces.next[arrays[i]].y + pieceHeight / 4;
				}
			} else {
				pieces.next[arrays[i]].x = pieces.next[arrays[i]].x - pieceHeight / 2 - pieceWidth / 2;
				pieces.next[arrays[i]].y = pieces.next[arrays[i]].y + pieceWidth / 2 + pieceHeight / 2;
				if (pieces[arrays[i]][pieces[arrays[i]].length - 1].side1 === pieces[arrays[i]][pieces[arrays[i]].length - 1].side2) {
					pieces.next[arrays[i]].x = pieces.next[arrays[i]].x - pieceHeight / 4;
				}
			}
			pieces.grow[arrays[i]] = arrays[(arrays.indexOf(pieces.grow[arrays[i]]) + 1) % arrays.length];
			pieces.branch[arrays[i]] = pieces.branch[arrays[i]] + 1;
		}
	}
}

function createRectangle(objectString) {
	'use strict';
	var sprite, object;
	object = JSON.parse(objectString);
	sprite = game.add.sprite(object.piece.x, object.piece.y, 'pieces');
	sprite.anchor.setTo(0.5, 0.5);
	sprite.angle = object.piece.angle;
	sprite.frame = object.piece.frame;
	pieces.next = object.next;
	pieces.angle = object.angle;
	pieces[object.array].push(object.piece);
	if (object.piece.side1 === object.piece.side2) {
		calculateRotationMoment(object.array);
	}
	if ((object.array === 'left' || object.array === 'right') && pieces[object.array].length > 2) {
		rotateCounterClock();
	} else {
		rotateNextPosition();
	}
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
	var index;
	index = pieces[array].length - 1;
	if (pieces[array][index].side1 === pieces[array][index].side2) {
		index = index - 1;
	}
	if (piece.side1 === piece.side2 && (piece.side1 === pieces[array][index].side1 || piece.side1 === pieces[array][index].side2)) {
		piece.angle = pieces.angle[array] + 90;
		piece.freeSide = 'side1';
		return;
	}
	if (piece.side1 === pieces[array][index].side1 || piece.side2 === pieces[array][index].side2) {
		piece.angle = pieces.angle[array] + 180;
		pieces.angle[array] = piece.angle;
		piece.freeSide = piece.side1 === pieces[array][index].side1 ? 'side2' : 'side1';
	} else if (piece.side1 === pieces[array][index].side2 || piece.side2 === pieces[array][index].side1) {
		piece.angle = pieces.angle[array];
		pieces.angle[array] = piece.angle;
		piece.freeSide = piece.side1 === pieces[array][index].side2 ? 'side2' : 'side1';
	}
}

function fixCarrocaPosition(array, piece) {
	'use strict';
	if (pieces.grow[array] === 'left') {
		piece.x = piece.x + pieceHeight / 2 - pieceWidth / 2;
	} else if (pieces.grow[array] === 'top') {
		piece.y = piece.y + pieceHeight / 2 - pieceWidth / 2;
	} else if (pieces.grow[array] === 'right') {
		piece.x = piece.x - pieceHeight / 2 + pieceWidth / 2;
	} else {
		piece.y = piece.y - pieceHeight / 2 + pieceWidth / 2;
	}
}

function calculateNextPosition(array, piece) {
	'use strict';
	var isCarroca = piece.side1 === piece.side2;
	if (isCarroca) {
		fixCarrocaPosition(array, piece);
	}
	if (pieces.grow[array] === 'left') {
		pieces.next[array].x -= isCarroca ? pieceWidth : pieceHeight;
	} else if (pieces.grow[array] === 'top') {
		pieces.next[array].y -= isCarroca ? pieceWidth : pieceHeight;
	} else if (pieces.grow[array] === 'right') {
		pieces.next[array].x += isCarroca ? pieceWidth : pieceHeight;
	} else {
		pieces.next[array].y += isCarroca ? pieceWidth : pieceHeight;
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
	} else {
		object.piece = setPiece(pieces.next.top.x, pieces.next.top.y, pieces.next.top.angle);
		object.array = 'top';
		if (!isMovePossible(object.piece, object.array)) {
			return false;
		}
	}
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
	} else if ((dBottom <= dTop && dBottom <= dLeft && dBottom <= dRight)) {
		object.piece = setPiece(pieces.next.bottom.x, pieces.next.bottom.y, pieces.next.bottom.angle);
		object.array = 'bottom';
		if (!isMovePossible(object.piece, object.array)) {
			return false;
		}
	} else if ((dRight <= dTop && dRight <= dLeft && dRight <= dBottom)) {
		object.piece = setPiece(pieces.next.right.x, pieces.next.right.y, pieces.next.right.angle);
		object.array = 'right';
		if (!isMovePossible(object.piece, object.array)) {
			return false;
		}
	} else {
		object.piece = setPiece(pieces.next.left.x, pieces.next.left.y, pieces.next.left.angle);
		object.array = 'left';
		if (!isMovePossible(object.piece, object.array)) {
			return false;
		}
	}
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
	calculateNextPosition(object.array, object.piece);
	rotatePiece(object.piece, object.array);
	object.next = pieces.next;
	if (!object) {
		console.log('move refused');
		return;
	}
	object.piece.branch = pieces.branch[object.array];
	object.angle = pieces.angle;
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
	game.load.spritesheet('hint', 'assets/spritesheets/hint.png', 30, 60);
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
		},
		grow: {
			top: 'top',
			bottom: 'bottom',
			left: 'left',
			right: 'right'
		},
		angle: {
			top: 0,
			bottom: 180,
			left: 270,
			right: 90
		},
		numberRotate: {
			top: [5, 6, 3, 4, 2, 3, 1],
			bottom: [5, 6, 3, 4, 2, 3, 1],
			left:  [2, 4, 5, 3, 4, 2, 3, 1],
			right:  [2, 4, 5, 3, 4, 2, 3, 1]
		},
		branch: {
			top: 0,
			bottom: 0,
			left: 0,
			right: 0
		}
	};
	pieces.top.push({side1: 6, side2: 7, angle: 0, freeSide: 'side1'});
	pieces.bottom.push({side1: 6, side2: 7, angle: 180, freeSide: 'side1'});
	pieces.left.push({side1: 6, side2: 7, angle: 270, freeSide: 'side1'});
	pieces.right.push({side1: 6, side2: 7, angle: 90, freeSide: 'side1'});
	hint = game.add.sprite(0, 0, 'hint');
	hint.anchor.setTo(0.5, 0.5);
}

function showHint() {
	'use strict';
	if (!selected.enabled) {
		hint.alpha = 0;
		return;
	}
	var object = {
		x: game.input.position.x,
		y: game.input.position.y
	};
	if (pieces.top.length <= 1 || pieces.bottom.length <= 1) {
		playPiece2(object);
	} else {
		playPiece4(object);
	}
	hint.x = object.piece.x;
	hint.y = object.piece.y;
	hint.angle = pieces.angle[object.array];
	if (object.piece.side1 === object.piece.side2) {
		hint.angle += 90;
		fixCarrocaPosition(object.array, hint);
	}
	hint.alpha = 1;
	if (isMovePossible(object.piece, object.array)) {
		hint.frame = 0;
		return;
	}
	hint.frame = 1;
}

function update() {
	'use strict';
	game.scale.setExactFit();
	game.scale.refresh();
	showHint();
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