/*global Config*/

var ButtonUp = function (game, hero) {
	"use strict";
	this.game = game;
	this.hero = hero;
	this.sprite = null;
};
ButtonUp.prototype =  {
	preload: function () {
		"use strict";
		this.game.load.spritesheet('up', Config.buttonUp.dir, Config.buttonUp.frame.width, Config.buttonUp.frame.height);
	},
	create: function () {
		"use strict";
		this.sprite = this.game.add.button(Config.buttonUp.x, Config.buttonUp.y, 'up', null, null, Config.buttonUp.frame.over, Config.buttonUp.frame.out, Config.buttonUp.frame.down, Config.buttonUp.frame.up);
		this.sprite.fixedToCamera = true;
	},
	update: function () {
		"use strict";
		if ((this.sprite.frame === Config.buttonUp.frame.down || this.game.input.keyboard.isDown(Config.buttonUp.key)) &&
			this.hero.sprite.body.onFloor()) {
			this.hero.sprite.body.velocity.y = Config.hero.velocity.jump;
			this.hero.jumpControl = this.hero.jumpControl + 1;
			if (this.hero.sprite.key === 'hero-normal') {
				this.hero.sprite.animations.stop();
				this.hero.sprite.frame = Config.hero.frame.normal.jumping;
			}
			return true;
		} else if ((this.sprite.frame ===  Config.buttonUp.frame.down || this.game.input.keyboard.isDown(Config.buttonUp.key)) &&
			this.hero.jumpControl < Config.hero.jump.max && this.hero.jumpControl !== 0) {
			this.hero.sprite.body.velocity.y = Config.hero.velocity.jump;
			this.hero.jumpControl = this.hero.jumpControl + 1;
			return true;
		}
		return false;
	}
};