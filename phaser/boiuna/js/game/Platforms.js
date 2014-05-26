/*global Config*/

var Platforms = function (game, tilemap) {
	"use strict";
	this.game = game;
	this.tilemap = tilemap;
	this.mainLayer = null;
};
Platforms.prototype = {
	create: function () {
		"use strict";
		this.tilemap.map.addTilesetImage(Config.platforms.tileset, 'terrain');
		this.mainLayer = this.tilemap.map.createLayer(Config.platforms.layer);
		this.tilemap.map.setCollisionByExclusion([0], Config.platforms.layer);
	}
};