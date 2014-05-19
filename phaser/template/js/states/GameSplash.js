/*global setTimeout, State, Config, Phaser*/

State.GameSplash = function (game) {
	"use strict";
	this.game = game;
};
State.GameSplash.prototype = {
	preload: function () {
		"use strict";
		this.game.load.image('game-splash', Config.gameSplash.dir);
	},
	create: function () {
		"use strict";
		var sprite = this.game.add.sprite(Config.gameSplash.x, Config.gameSplash.y, 'game-splash');
		setTimeout(function () {
			this.game.add.tween(sprite).to({alpha : 0}, Config.gameSplash.millis, Phaser.Easing.Linear.None).start();
		}, Config.gameSplash.millis);
		setTimeout(function () {
			this.game.state.start('Menu');
		}, Config.gameSplash.nextState);
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
	}
};