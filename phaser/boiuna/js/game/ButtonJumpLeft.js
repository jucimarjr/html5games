/*global Config*/

var ButtonJumpLeft = function (game, hero) {
	"use strict";
	this.game = game;
	this.hero = hero;
	this.sprite = null;
};
ButtonJumpLeft.prototype = {
	create: function () {
		"use strict";
		this.sprite = this.game.add.button(Config.buttonJumpLeft.x, Config.buttonJumpLeft.y, 'right', null, null, Config.buttonJumpLeft.frame.over, Config.buttonJumpLeft.frame.out, Config.buttonJumpLeft.frame.down, Config.buttonJumpLeft.frame.up);
		this.sprite.fixedToCamera = true;
	},
	update: function () {
		"use strict";
		if (this.sprite.frame ===  Config.buttonJumpLeft.frame.down) {
			this.hero.moveLeft();
			this.hero.jump();
			return true;
		}
		return false;
	}
};