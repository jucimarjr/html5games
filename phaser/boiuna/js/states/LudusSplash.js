/*global setTimeout, Config, Phaser*/

var State = {
	LudusSplash: function (game) {
		"use strict";
		this.game = game;
	}
};
State.LudusSplash.prototype = {
	preload: function () {
		"use strict";
		this.game.load.image('ludus-splash', Config.ludusSplash.dir);
	},
	create: function () {
		"use strict";
		var sprite = this.game.add.sprite(Config.ludusSplash.x, Config.ludusSplash.y, 'ludus-splash');
		setTimeout(function () {
			this.game.add.tween(sprite).to({alpha : 0}, Config.ludusSplash.millis, Phaser.Easing.Linear.None).start();
		}, Config.ludusSplash.millis);
		setTimeout(function () {
			this.game.state.start('GameSplash');
		}, Config.ludusSplash.nextState);
	}
};