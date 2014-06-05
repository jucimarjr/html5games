/*global Config*/

var ButtonLeft = function (game, hero) {
	"use strict";
	this.game = game;
	this.hero = hero;
	this.sprite = null;
};
ButtonLeft.prototype =  {
	create: function () {
		"use strict";
		this.sprite = this.game.add.button(Config.buttonLeft.x, Config.buttonLeft.y, 'left', null, null, Config.buttonLeft.frame.over, Config.buttonLeft.frame.out, Config.buttonLeft.frame.down, Config.buttonLeft.frame.up);
		this.sprite.fixedToCamera = true;
	},
	update: function () {
		"use strict";
		if (this.sprite.frame ===  Config.buttonLeft.frame.down || this.game.input.keyboard.isDown(Config.buttonLeft.key)) {
			this.hero.moveLeft();
			return true;
		}
		return false;
	}
};