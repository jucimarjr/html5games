/*global Config, Phaser*/

var Level = function (game) {
	"use strict";
	this.game = game;
	this.sprite = null;
};
Level.prototype = {
	preload: function () {
		"use strict";
		this.game.load.image('game-background', 'assets/images/GameBackground_1920-600.png');
	},
	create : function () {
		"use strict";
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.world.setBounds(Config.level.worldBounds.xi, Config.level.worldBounds.yi, Config.level.worldBounds.xf, Config.level.worldBounds.yf);
		this.sprite = this.game.add.tileSprite(Config.level.x, Config.level.y, Config.global.screen.width * 2, Config.global.screen.height, 'game-background');
	}
};