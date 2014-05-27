/*global Config, Phaser*/

var Level = function (game) {
	"use strict";
	this.game = game;
	this.sprite = null;
};
Level.prototype = {
	create: function () {
		"use strict";
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.world.setBounds(Config.level.worldBounds.xi, Config.level.worldBounds.yi, Config.level.worldBounds.xf, Config.level.worldBounds.yf);
		this.game.physics.arcade.checkCollision.up = false;
		this.sprite = this.game.add.tileSprite(Config.level.x, Config.level.y, Config.global.screen.width * 2, Config.global.screen.height, 'game-background');
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
	}
};