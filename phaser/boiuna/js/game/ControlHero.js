/*global Config, ButtonHit, ButtonLeft, ButtonRight, ButtonUp, ButtonJumpLeft, ButtonJumpRight*/

var ControlHero = function (game, hero) {
	"use strict";
	this.game = game;
	this.hero = hero;
	this.buttonHit = new ButtonHit(game, hero);
	this.buttonLeft = new ButtonLeft(game, hero);
	this.buttonRight = new ButtonRight(game, hero);
	this.buttonUp = new ButtonUp(game, hero);
	this.buttonJumpLeft = new ButtonJumpLeft(game, hero);
	this.buttonJumpRight = new ButtonJumpRight(game, hero);
};
ControlHero.prototype = {
	create: function () {
		"use strict";
		this.buttonHit.create();
		this.buttonLeft.create();
		this.buttonRight.create();
		this.buttonUp.create();
		this.buttonJumpLeft.create();
		this.buttonJumpRight.create();
	},
	update: function () {
		"use strict";
		var inputLeft, inputRight, inputUp, inputJumpLeft, inputJumpRight;
		this.buttonHit.update();
		inputLeft = this.buttonLeft.update();
		inputRight = this.buttonRight.update();
		inputUp = this.buttonUp.update();
		inputJumpLeft = this.buttonJumpLeft.update();
		inputJumpRight = this.buttonJumpRight.update();
		if (inputLeft === false && inputRight === false && inputUp === false && inputJumpLeft === false && inputJumpRight === false) {
			this.hero.stop();
		}
		if (!this.hero.sprite.body.onFloor() && ((inputUp === false && inputJumpLeft === false && inputJumpRight === false) ||
			(this.hero.jumpControl >= Config.hero.jump.max))) {
			this.hero.fall();
		}
	}
};