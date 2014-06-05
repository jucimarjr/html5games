/*global Config*/

var ButtonRight = function (game, hero) {
	"use strict";
	this.game = game;
	this.hero = hero;
	this.sprite = null;
};
ButtonRight.prototype =  {
	create: function () {
		"use strict";
		this.sprite = this.game.add.button(Config.buttonRight.x, Config.buttonRight.y, 'right', null, null, Config.buttonRight.frame.over, Config.buttonRight.frame.out, Config.buttonRight.frame.down, Config.buttonRight.frame.up);
		this.sprite.fixedToCamera = true;
	},
	update: function () {
		"use strict";
		if (this.sprite.frame === Config.buttonRight.frame.down || this.game.input.keyboard.isDown(Config.buttonRight.key)) {
			this.hero.moveRight();
			return true;
		}
		return false;
	}
};