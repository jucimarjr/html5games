/*global setTimeout, Config, Phaser*/

State.SponsorSplash = function (game) {
		"use strict";
		this.game = game;
	
};
State.SponsorSplash.prototype = {
	preload: function () {
		"use strict";
		this.game.load.image('sponsor-splash', Config.sponsorSplash.dir);
	},
	create: function () {
		"use strict";
		var sprite = this.game.add.sprite(Config.sponsorSplash.x, Config.sponsorSplash.y, 'sponsor-splash');
		setTimeout(function () {
			this.game.add.tween(sprite).to({alpha : 0}, Config.sponsorSplash.millis, Phaser.Easing.Linear.None).start();
		}, Config.sponsorSplash.millis);
		setTimeout(function () {
			this.game.state.start('GameSplash');
		}, Config.sponsorSplash.nextState);
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
	}
};