/*global Config, Phaser*/

var Princess = function (game, platforms, lady, dragon, hero) {
	"use strict";
	this.game = game;
	this.sprite = null;
	this.lady = lady;
	this.dragon = dragon;
	this.platforms = platforms;
	this.hero = hero;
	this.onGame = null;
};
Princess.prototype = {
	create: function () {
		"use strict";
		var x, y;
		x = Math.floor(Math.random() * Config.global.screen.width + Config.global.screen.width - Config.princess.frame.width);
		y = Math.floor(Math.random() * Config.global.screen.height - Config.princess.frame.height - Config.platforms.height * 2);
		this.sprite = this.game.add.sprite(x, y, 'princess');
		this.sprite.alpha = 0;
		this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.body.gravity.y = Config.princess.gravity;
		this.sprite.animations.add('stay', Config.princess.frame.stay, Config.global.animationVelocity, true);
		this.sprite.animations.play('stay');
		this.onGame = false;
	},
	update: function () {
		"use strict";
		this.game.physics.arcade.collide(this.sprite, this.platforms.mainLayer);
		if (this.lady.group.length === 0 && !this.onGame) {
			this.appear()
		}
		if (this.onGame) {
			this.game.physics.arcade.overlap(this.dragon.head, this.sprite, this.collision, null, this);
		}
	},
	collision: function () {
		"use strict";
		this.sprite.kill();
		this.hero.sprite.kill();
	},
	appear: function () {
		"use strict";
		this.onGame = true;
		this.sprite.alpha = 1;
		this.dragon.head.y = this.sprite.y;
		this.dragon.head.x = -Config.dragon.frame.width * this.dragon.body.length;
		this.dragon.growBody(this.dragon.body.length);
		this.dragon.moveRight();
	}
};