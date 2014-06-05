/*global Config, Phaser*/

var Lady = function (game, tilemap) {
	"use strict";
	this.game = game;
	this.group = null;
	this.tilemap = tilemap;
};
Lady.prototype = {
	create: function () {
		"use strict";
		this.group = this.game.add.group();
		this.group.enableBody = true;
		this.tilemap.map.createFromObjects(Config.lady.layer, Config.lady.gid, 'lady', Config.lady.frame.start, true, false, this.group);
		this.game.physics.enable(this.group, Phaser.Physics.ARCADE);
		this.group.callAll('animations.add', 'animations', 'stay', Config.lady.frame.stay, Config.global.animationVelocity, true);
		this.group.callAll('animations.play', 'animations', 'stay');
		this.group.setAll('alive', true);
	}
};

