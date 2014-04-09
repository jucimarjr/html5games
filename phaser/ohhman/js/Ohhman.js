var Ohhman = function () {
	this.ohhman = null;
};

Ohhman = function (game) {
	this.game = game;
};

Ohhman.prototype.preload = function () {
	game.load.image('ohhman', 'assets/images/pacMan_36-36.png');
};

Ohhman.prototype.create = function () {
	this.ohhman = game.add.sprite(0, 0, 'ohhman');
};