/*global Config, Phaser*/

var Life = function (game, hero) {
	"use strict";
	this.game = game;
	this.hero = hero;
	this.group = null;
	this.lifesLost = 0;
};
Life.prototype = {
	create: function () {
		"use strict";
		var i;
		this.group = this.game.add.group();
		for (i = Config.life.number - 1; i >= 0; i = i - 1) {
			this.group.create(Config.life.x + i * Config.life.distanceBetween, Config.life.y, 'life');
		}
		this.group.setAll('alive', true);
		this.group.setAll('fixedToCamera', true);
		this.lifesLost = 0;
	},
	update: function () {
		"use strict";
		if (this.hero.sprite.health < Config.hero.health.initial - this.lifesLost * Config.hero.health.initial / Config.life.number && this.lifesLost < Config.life.number) {
			var sprite = this.group.getFirstAlive();
			this.lifesLost = this.lifesLost + 1;
			if (sprite !== null) {
				sprite.kill();
			}
		}
	}
};