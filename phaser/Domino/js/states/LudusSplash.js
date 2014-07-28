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
		this.loadAssetsGameSplash();
	},
	create: function () {
		"use strict";
		this.game.input.keyboard.addKeyCapture(Config.global.key.annoying);
		var sprite = this.game.add.sprite(Config.ludusSplash.x, Config.ludusSplash.y, 'ludus-splash');
		setTimeout(function () {
			this.game.add.tween(sprite).to({alpha : Config.ludusSplash.dim}, Config.ludusSplash.time.dim, Phaser.Easing.Linear.None).start();
		}, Config.ludusSplash.time.dim);
		setTimeout(function () {
			this.game.state.start('SponsorSplash');
		}, Config.ludusSplash.time.nextState);
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
	},
	loadAssetsGameSplash: function () {
		"use strict";
		this.game.load.image('progress-bar', Config.gameSplash.dir.progressBar);
		this.game.load.image('game-splash', Config.gameSplash.dir.background);
	}
};