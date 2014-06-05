/*global Config*/

var ButtonUp = function (game, hero) {
	"use strict";
	this.game = game;
	this.hero = hero;
	this.sprite = null;
};
ButtonUp.prototype =  {
	create: function () {
		"use strict";
		this.sprite = this.game.add.button(Config.buttonUp.x, Config.buttonUp.y, 'up', null, null, Config.buttonUp.frame.over, Config.buttonUp.frame.out, Config.buttonUp.frame.down, Config.buttonUp.frame.up);
		this.sprite.fixedToCamera = true;
	},
	update: function () {
		"use strict";
		if (this.sprite.frame === Config.buttonUp.frame.down || this.game.input.keyboard.isDown(Config.buttonUp.key)) {
			this.hero.jump();
			return true;
		}
		return false;
	}
};