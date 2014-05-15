var ButtonJumpLeft = function (game, hero) {
	"use strict";
	this.game = game;
	this.hero = hero;
	this.sprite = null;
};
ButtonJumpLeft.prototype = {
	preload: function () {
		"use strict";
		this.game.load.spritesheet('jump-left', Config.buttonJumpLeft.dir, Config.buttonJumpLeft.frame.width, Config.buttonJumpLeft.frame.height);
	},
	create: function () {
		"use strict";
		this.sprite = this.game.add.button(Config.buttonJumpLeft.x, Config.buttonJumpLeft.y, 'right', null, null, Config.buttonJumpLeft.frame.over, Config.buttonJumpLeft.frame.out, Config.buttonJumpLeft.frame.down, Config.buttonJumpLeft.frame.up);
		this.sprite.fixedToCamera = true;
	},
	update: function () {
		"use strict";
		if (this.sprite.frame ===  Config.buttonJumpLeft.frame.down) {
			this.moveLeft();
			this.jump();
			return true;
		}
		return false;
	},
	moveLeft: function () {
		"use strict";
		this.hero.sprite.anchor = Config.hero.anchor.left;
		this.hero.sprite.body.velocity.x = -Config.hero.velocity.run;
		if (this.hero.sprite.body.onFloor() && this.hero.sprite.key === 'hero-normal') {
			this.hero.sprite.animations.play('run');
		}
		this.hero.sprite.scale = Config.hero.scale.left;
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