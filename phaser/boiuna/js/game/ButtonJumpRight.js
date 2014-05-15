var ButtonJumpRight = function (game, hero) {
	"use strict";
	this.game = game;
	this.hero = hero;
	this.sprite = null;
};
ButtonJumpRight.prototype = {
	preload: function () {
		"use strict";
		this.game.load.spritesheet('jump-right', Config.buttonJumpRight.dir, Config.buttonJumpRight.frame.width, Config.buttonJumpRight.frame.height);
	},
	create: function () {
		"use strict";
		this.sprite = this.game.add.button(Config.buttonJumpRight.x, Config.buttonJumpRight.y, 'right', null, null, Config.buttonJumpRight.frame.over, Config.buttonJumpRight.frame.out, Config.buttonJumpRight.frame.down, Config.buttonJumpRight.frame.up);
		this.sprite.fixedToCamera = true;
	},
	update: function () {
		"use strict";
		if (this.sprite.frame ===  Config.buttonJumpRight.frame.down) {
			this.moveRight();
			this.jump();
			return true;
		}
		return false;
	},
	moveRight: function () {
		"use strict";
		this.hero.sprite.anchor = Config.hero.anchor.right;
		this.hero.sprite.body.velocity.x = Config.hero.velocity.run;
		if (this.hero.sprite.body.onFloor() && this.hero.sprite.key === 'hero-normal') {
			this.hero.sprite.animations.play('run');
		}
		this.hero.sprite.scale = Config.hero.scale.right;
	},
	jump: function () {
		"use strict";
		if (this.hero.sprite.body.onFloor()) {
			this.hero.sprite.body.velocity.y = Config.hero.velocity.jump;
			this.hero.jumpControl = this.hero.jumpControl + 1;
			if (this.hero.sprite.key === 'hero-normal') {
				this.hero.sprite.animations.stop();
				this.hero.sprite.frame = Config.hero.frame.normal.jumping;
			}
			return true;
		} else if (this.hero.jumpControl < Config.hero.jump.max && this.hero.jumpControl !== 0) {
			this.hero.sprite.body.velocity.y = Config.hero.velocity.jump;
			this.hero.jumpControl = this.hero.jumpControl + 1;
			return true;
		} 
	}
}