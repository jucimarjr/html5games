/*global Config*/

var ButtonJumpRight = function (game, hero) {
	"use strict";
	this.game = game;
	this.hero = hero;
	this.sprite = null;
};
ButtonJumpRight.prototype = {
	create: function () {
		"use strict";
		this.sprite = this.game.add.button(Config.buttonJumpRight.x, Config.buttonJumpRight.y, 'right', null, null, Config.buttonJumpRight.frame.over, Config.buttonJumpRight.frame.out, Config.buttonJumpRight.frame.down, Config.buttonJumpRight.frame.up);
		this.sprite.fixedToCamera = true;
	},
	update: function () {
		"use strict";
		if (this.sprite.frame ===  Config.buttonJumpRight.frame.down) {
			this.hero.moveRight();
			this.hero.jump();
			return true;
		}
		return false;
	}
};