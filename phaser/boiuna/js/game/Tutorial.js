/*global Config, Phaser*/

var Tutorial = function (game) {
	"use strict";
	this.game = game;
	this.sprite = null;
};
Tutorial.prototype = {
	create : function () {
		"use strict";
		this.sprite = this.game.add.sprite(Config.tutorial.x, Config.tutorial.y, 'tutorial');
		this.sprite.anchor.setTo(0.5, 0.5);
		this.sprite.fixedToCamera = true;
		this.sprite.alpha = Config.tutorial.dim;
		this.game.add.tween(this.sprite).to({alpha : 1}, Config.tutorial.time.dim, Phaser.Easing.Linear.None).to({alpha : Config.tutorial.dim}, Config.tutorial.time.dim, Phaser.Easing.Linear.None).repeat(Config.tutorial.tweenRepeat).start();
	}
};