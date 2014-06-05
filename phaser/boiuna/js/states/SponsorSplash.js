/*global setTimeout, State, Config, Phaser*/

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
			this.game.add.tween(sprite).to({alpha : Config.sponsorSplash.dim}, Config.sponsorSplash.time.dim, Phaser.Easing.Linear.None).start();
		}, Config.sponsorSplash.time.dim);
		setTimeout(function () {
			this.game.state.start('GameSplash');
		}, Config.sponsorSplash.time.nextState);
	},
	update: function () {
		"use strict";
		Config.global.screen.resize(this.game);
	}
};