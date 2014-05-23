/*global Config*/

var ButtonHit = function (game, hero) {
	"use strict";
	this.game = game;
	this.hero = hero;
	this.sprite = null;
};
ButtonHit.prototype = {
	create: function () {
		"use strict";
		this.sprite = this.game.add.button(Config.buttonHit.x, Config.buttonHit.y, 'hit', null, null, Config.buttonHit.frame.over, Config.buttonHit.frame.out, Config.buttonHit.frame.down, Config.buttonHit.frame.up);
		this.sprite.fixedToCamera = true;
	},
	update: function () {
		"use strict";
		if (this.sprite.frame ===  Config.buttonHit.frame.down || this.game.input.keyboard.isDown(Config.buttonHit.key)) {
			this.hero.hit();
		} else {
			this.hero.restoreTexture();
		}
	}
};