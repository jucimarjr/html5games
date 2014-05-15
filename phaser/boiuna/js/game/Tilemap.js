/*global Config, Phaser*/

var Tilemap = function (game) {
	"use strict";
	this.game = game;
};
Tilemap.prototype = {
	preload: function () {
		"use strict";
		this.game.load.tilemap('tilemap', Config.tilemap.dir, null, Phaser.Tilemap.TILED_JSON);
	},
	create: function () {
		"use strict";
		this.map = this.game.add.tilemap('tilemap');
	}
};