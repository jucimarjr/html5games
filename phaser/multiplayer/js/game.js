/*global Phaser, socket, console*/

var game, socket, userroom, pieces, pieceWidth, pieceHeight, myPieces, selected, hint;

function countCarroca(arrayName, branch) {
	'use strict';
	var i, counter = 0, size = pieces[arrayName].length;
	for (i = 0; i < size; i = i + 1) {
		if (pieces[arrayName][i].side1 === pieces[arrayName][i].side2 && pieces[arrayName][i].branch === branch) {
			counter = counter + 1;
		}
	}
	return counter;
}

function calculateRotationMoment(arrayName) {
	'use strict';
	if (pieces.grow[arrayName] === 'top' && countCarroca(arrayName, pieces.branch[arrayName]) === 2) {
		pieces.numberRotate[arrayName][0] = pieces.numberRotate[arrayName][0] + 1;
	} else if (pieces.grow[arrayName] === 'right' && countCarroca(arrayName, pieces.branch[arrayName]) === 1) {
		pieces.numberRotate[arrayName][0] = pieces.numberRotate[arrayName][0] + 1;
	} else if (pieces.grow[arrayName] === 'left' && countCarroca(arrayName, pieces.branch[arrayName]) === 1) {
		pieces.numberRotate[arrayName][0] = pieces.numberRotate[arrayName][0] + 1;
	} else if (pieces.grow[arrayName] === 'bottom' && countCarroca(arrayName, pieces.branch[arrayName]) === 3) {
		pieces.numberRotate[arrayName][0] = pieces.numberRotate[arrayName][0] + 1;
	}
}

function rotateNextPosition() {
	'use strict';
	var i, arraysNames;
	arraysNames = ['top', 'right', 'bottom', 'left'];
	for (i = 0; i < 4; i = i + 1) {
		if (pieces.numberRotate[arraysNames[i]].length > 0 && pieces[arraysNames[i]].length === pieces.numberRotate[arraysNames[i]][0]) {
			pieces.numberRotate[arraysNames[i]][1] += pieces.numberRotate[arraysNames[i]][0];
			pieces.numberRotate[arraysNames[i]].shift();
			pieces.angle[arraysNames[i]] = pieces.angle[arraysNames[i]] + 90;
			if (pieces.grow[arraysNames[i]] === 'left') {
				pieces.next[arraysNames[i]].x = pieces.next[arraysNames[i]].x + pieceHeight / 2 + pieceWidth / 2;
				pieces.next[arraysNames[i]].y = pieces.next[arraysNames[i]].y - pieceWidth / 2 - pieceHeight / 2;
				if (pieces[arraysNames[i]][pieces[arraysNames[i]].length - 1].side1 === pieces[arraysNames[i]][pieces[arraysNames[i]].length - 1].side2) {
					pieces.next[arraysNames[i]].y = pieces.next[arraysNames[i]].y - pieceHeight / 4;
				}
			} else if (pieces.grow[arraysNames[i]] === 'top') {
				pieces.next[arraysNames[i]].x = pieces.next[arraysNames[i]].x + pieceHeight / 2 + pieceWidth / 2;
				pieces.next[arraysNames[i]].y = pieces.next[arraysNames[i]].y + pieceWidth / 2 + pieceHeight / 2;
				if (pieces[arraysNames[i]][pieces[arraysNames[i]].length - 1].side1 === pieces[arraysNames[i]][pieces[arraysNames[i]].length - 1].side2) {
					pieces.next[arraysNames[i]].x = pieces.next[arraysNames[i]].x + pieceHeight / 4;
				}
			} else if (pieces.grow[arraysNames[i]] === 'right') {
				pieces.next[arraysNames[i]].x = pieces.next[arraysNames[i]].x - pieceHeight / 2 - pieceWidth / 2;
				pieces.next[arraysNames[i]].y = pieces.next[arraysNames[i]].y + pieceWidth / 2 + pieceHeight / 2;
				if (pieces[arraysNames[i]][pieces[arraysNames[i]].length - 1].side1 === pieces[arraysNames[i]][pieces[arraysNames[i]].length - 1].side2) {
					pieces.next[arraysNames[i]].y = pieces.next[arraysNames[i]].y + pieceHeight / 4;
				}
			} else {
				pieces.next[arraysNames[i]].x = pieces.next[arraysNames[i]].x - pieceHeight / 2 - pieceWidth / 2;
				pieces.next[arraysNames[i]].y = pieces.next[arraysNames[i]].y - pieceWidth / 2 - pieceHeight / 2;
				if (pieces[arraysNames[i]][pieces[arraysNames[i]].length - 1].side1 === pieces[arraysNames[i]][pieces[arraysNames[i]].length - 1].side2) {
					pieces.next[arraysNames[i]].x = pieces.next[arraysNames[i]].x - pieceHeight / 4;
				}
			}
			pieces.grow[arraysNames[i]] = arraysNames[(arraysNames.indexOf(pieces.grow[arraysNames[i]]) + 1) % arraysNames.length];
			pieces.branch[arraysNames[i]] = pieces.branch[arraysNames[i]] + 1;
		}
	}
}

function rotateCounterClock() {
	'use strict';
	var i, arraysNames;
	arraysNames = ['top', 'left', 'bottom', 'right'];
	for (i = 0; i < 4; i = i + 1) {
		if (pieces.numberRotate[arraysNames[i]].length > 0 && pieces[arraysNames[i]].length === pieces.numberRotate[arraysNames[i]][0]) {
			pieces.numberRotate[arraysNames[i]][1] += pieces.numberRotate[arraysNames[i]][0];
			pieces.numberRotate[arraysNames[i]].shift();
			pieces.angle[arraysNames[i]] = pieces.angle[arraysNames[i]] - 90;
			if (pieces.grow[arraysNames[i]] === 'right') {
				pieces.next[arraysNames[i]].x = pieces.next[arraysNames[i]].x - pieceHeight / 2 - pieceWidth / 2;
				pieces.next[arraysNames[i]].y = pieces.next[arraysNames[i]].y - pieceWidth / 2 - pieceHeight / 2;
				if (pieces[arraysNames[i]][pieces[arraysNames[i]].length - 1].side1 === pieces[arraysNames[i]][pieces[arraysNames[i]].length - 1].side2) {
					pieces.next[arraysNames[i]].y = pieces.next[arraysNames[i]].y - pieceHeight / 4;
				}
			} else if (pieces.grow[arraysNames[i]] === 'bottom') {
				pieces.next[arraysNames[i]].x = pieces.next[arraysNames[i]].x + pieceHeight / 2 + pieceWidth / 2;
				pieces.next[arraysNames[i]].y = pieces.next[arraysNames[i]].y - pieceWidth / 2 - pieceHeight / 2;
				if (pieces[arraysNames[i]][pieces[arraysNames[i]].length - 1].side1 === pieces[arraysNames[i]][pieces[arraysNames[i]].length - 1].side2) {
					pieces.next[arraysNames[i]].x = pieces.next[arraysNames[i]].x + pieceHeight / 4;
				}
			} else if (pieces.grow[arraysNames[i]] === 'left') {
				pieces.next[arraysNames[i]].x = pieces.next[arraysNames[i]].x + pieceHeight / 2 + pieceWidth / 2;
				pieces.next[arraysNames[i]].y = pieces.next[arraysNames[i]].y + pieceWidth / 2 + pieceHeight / 2;
				if (pieces[arraysNames[i]][pieces[arraysNames[i]].length - 1].side1 === pieces[arraysNames[i]][pieces[arraysNames[i]].length - 1].side2) {
					pieces.next[arraysNames[i]].y = pieces.next[arraysNames[i]].y + pieceHeight / 4;
				}
			} else {
				pieces.next[arraysNames[i]].x = pieces.next[arraysNames[i]].x - pieceHeight / 2 - pieceWidth / 2;
				pieces.next[arraysNames[i]].y = pieces.next[arraysNames[i]].y + pieceWidth / 2 + pieceHeight / 2;
				if (pieces[arraysNames[i]][pieces[arraysNames[i]].length - 1].side1 === pieces[arraysNames[i]][pieces[arraysNames[i]].length - 1].side2) {
					pieces.next[arraysNames[i]].x = pieces.next[arraysNames[i]].x - pieceHeight / 4;
				}
			}
			pieces.grow[arraysNames[i]] = arraysNames[(arraysNames.indexOf(pieces.grow[arraysNames[i]]) + 1) % arraysNames.length];
			pieces.branch[arraysNames[i]] = pieces.branch[arraysNames[i]] + 1;
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

function isMovePossible(piece, arrayName) {
	'use strict';
	var last = pieces[arrayName].length - 1;
	if ((arrayName === 'left' || arrayName === 'right') && (pieces.top.length === 1 || pieces.bottom.length === 1)) {
		return false;
	}
	if (piece.side1 === pieces[arrayName][last][pieces[arrayName][last].freeSide] || piece.side2 === pieces[arrayName][last][pieces[arrayName][last].freeSide]) {
		return true;
	}
	return false;
}

function rotatePiece(piece, arrayName) {
	'use strict';
	var index;
	index = pieces[arrayName].length - 1;
	if (pieces[arrayName][index].side1 === pieces[arrayName][index].side2) {
		index = index - 1;
	}
	if (piece.side1 === piece.side2 && (piece.side1 === pieces[arrayName][index].side1 || piece.side1 === pieces[arrayName][index].side2)) {
		piece.angle = pieces.angle[arrayName] + 90;
		piece.freeSide = 'side1';
		return;
	}
	if (piece.side1 === pieces[arrayName][index].side1 || piece.side2 === pieces[arrayName][index].side2) {
		piece.angle = pieces.angle[arrayName] + 180;
		pieces.angle[arrayName] = piece.angle;
		piece.freeSide = piece.side1 === pieces[arrayName][index].side1 ? 'side2' : 'side1';
	} else if (piece.side1 === pieces[arrayName][index].side2 || piece.side2 === pieces[arrayName][index].side1) {
		piece.angle = pieces.angle[arrayName];
		pieces.angle[arrayName] = piece.angle;
		piece.freeSide = piece.side1 === pieces[arrayName][index].side2 ? 'side2' : 'side1';
	}
}

function fixCarrocaPosition(arrayName, piece) {
	'use strict';
	if (pieces.grow[arrayName] === 'left') {
		piece.x = piece.x + pieceHeight / 2 - pieceWidth / 2;
	} else if (pieces.grow[arrayName] === 'top') {
		piece.y = piece.y + pieceHeight / 2 - pieceWidth / 2;
	} else if (pieces.grow[arrayName] === 'right') {
		piece.x = piece.x - pieceHeight / 2 + pieceWidth / 2;
	} else {
		piece.y = piece.y - pieceHeight / 2 + pieceWidth / 2;
	}
}

function calculateNextPosition(arrayName, piece) {
	'use strict';
	var isCarroca = piece.side1 === piece.side2;
	if (isCarroca) {
		fixCarrocaPosition(arrayName, piece);
	}
	if (pieces.grow[arrayName] === 'left') {
		pieces.next[arrayName].x -= isCarroca ? pieceWidth : pieceHeight;
	} else if (pieces.grow[arrayName] === 'top') {
		pieces.next[arrayName].y -= isCarroca ? pieceWidth : pieceHeight;
	} else if (pieces.grow[arrayName] === 'right') {
		pieces.next[arrayName].x += isCarroca ? pieceWidth : pieceHeight;
	} else {
		pieces.next[arrayName].y += isCarroca ? pieceWidth : pieceHeight;
	}
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
	} else if ((dBottom <= dTop && dBottom <= dLeft && dBottom <= dRight)) {
		object.piece = setPiece(pieces.next.bottom.x, pieces.next.bottom.y, pieces.next.bottom.angle);
		object.array = 'bottom';
	} else if ((dRight <= dTop && dRight <= dLeft && dRight <= dBottom)) {
		object.piece = setPiece(pieces.next.right.x, pieces.next.right.y, pieces.next.right.angle);
		object.array = 'right';
	} else {
		object.piece = setPiece(pieces.next.left.x, pieces.next.left.y, pieces.next.left.angle);
		object.array = 'left';
	}
	return object;
}

function onClick() {
	'use strict';
	if (!selected.enabled || (game.input.position.y > game.height - pieceHeight)) {
		return;
	}
	selected.enabled = false;
	if (selected.sprite) {
		selected.sprite.destroy();
	}
	var object = {
		x: game.input.position.x,
		y: game.input.position.y,
		room: userroom
	};
	playPiece4(object);
	if (!isMovePossible(object.piece, object.array)) {
		return;
	}
	selected.spriteClicked.destroy();
	calculateNextPosition(object.array, object.piece);
	rotatePiece(object.piece, object.array);
	object.next = pieces.next;
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
	if (selected.sprite) {
		selected.sprite.destroy();
	}
	if (selected.enabled && selected.piece === myPieces[indexOfFrame(sprite.frame)]) {
		selected.enabled = false;
		return;
	}
	selected.piece = myPieces[indexOfFrame(sprite.frame)];
	selected.spriteClicked = sprite;
	selected.sprite = game.add.sprite(sprite.x, sprite.y, 'selection');
	selected.sprite.anchor.setTo(0.5, 0.5);
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
	game.load.image('selection', 'assets/images/selection.png');
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
	hint = [game.add.sprite(0, 0, 'hint'), game.add.sprite(0, 0, 'hint'), game.add.sprite(0, 0, 'hint'), game.add.sprite(0, 0, 'hint')];
}

function showHint() {
	'use strict';
	var i, position = {}, arraysNames = ['top', 'right', 'left', 'bottom'], size = arraysNames.length;
	if (!selected.enabled) {
		for (i = 0; i < size; i = i + 1) {
			hint[i].alpha = 0;
		}
		return;
	}
	for (i = 0; i < size; i = i + 1) {
		hint[i].anchor.setTo(0.5, 0.5);
		position.x = pieces.next[arraysNames[i]].x;
		position.y = pieces.next[arraysNames[i]].y;
		position.angle = pieces.angle[arraysNames[i]];
		if (selected.piece.side1 === selected.piece.side2) {
			position.angle += 90;
			fixCarrocaPosition(arraysNames[i], position);
		}
		hint[i].x = position.x;
		hint[i].y = position.y;
		hint[i].angle = position.angle;
		hint[i].alpha = 1;
		if (isMovePossible(selected.piece, arraysNames[i])) {
			hint[i].frame = 0;
		} else {
			hint[i].frame = 1;
		}
	}
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