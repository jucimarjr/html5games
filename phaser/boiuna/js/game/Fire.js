/*global Config, Phaser*/

var Fire = function (game, hero, smallDragon) {
	"use strict";
	this.game = game;
	this.hero = hero;
	this.smallDragon = smallDragon;
	this.group = null;
	this.shootTime = [];
};
Fire.prototype = {
	create: function () {
		"use strict";
		var i;
		for (i = 0; i < Config.smallDragon.number; i = i + 1) {
			this.shootTime.push(0);
		}
		this.group = this.game.add.group();
		this.group.createMultiple(Config.fire.number, 'fire');
		this.group.enableBody = true;
		this.game.physics.enable(this.group, Phaser.Physics.ARCADE);
		this.group.setAll('exists', false);
		this.group.setAll('visible', false);
		this.group.setAll('alive', false);
	},
	update: function () {
		"use strict";
		this.smallDragon.group.forEachAlive(this.shoot, this);
		this.game.physics.arcade.overlap(this.hero.sprite, this.group, this.collision, null, this);
	},
	shoot: function (sprite) {
		"use strict";
		if (Math.abs(sprite.x - this.hero.sprite.x) < Config.fire.range && Math.abs(sprite.y - this.hero.sprite.y) < Config.fire.range && this.game.time.now > this.shootTime[this.smallDragon.group.getIndex(sprite)]) {
			this.shootTime[this.smallDragon.group.getIndex(sprite)] = this.game.time.now + Config.fire.intervalShooting;
			var fire = this.group.getFirstExists(false);
			if (fire !== null) {
				fire.animations.add('move', Config.fire.frame.move, Config.fire.animationVelocity, true);
				fire.animations.play('move');
				if (sprite.scale === Config.smallDragon.scale.left) {
					fire.reset(sprite.x + Config.fire.adjust.x, sprite.y + Config.fire.adjust.y);
				} else {
					fire.reset(sprite.x - Config.fire.adjust.x, sprite.y + Config.fire.adjust.y);
				}
				fire.lifespan = Config.fire.lifespan;
				this.game.physics.arcade.moveToObject(fire, this.hero.sprite, Config.fire.velocity);
			}
		}
	},
	collision: function (spriteHero, spriteFire) {
		"use strict";
		this.hero.hurt(Config.fire.damage);
	}
};