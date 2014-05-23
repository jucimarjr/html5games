/*global Config, Phaser*/

var Tilemap = function (game) {
	"use strict";
	this.game = game;
};
Tilemap.prototype = {
	create: function () {
		"use strict";
		this.map = this.game.add.tilemap('tilemap');
	}
};