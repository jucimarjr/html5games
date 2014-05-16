/*global Config, Phaser*/

var SmallDragon = function (game, hero, platforms) {
	"use strict";
	this.game = game;
	this.hero = hero;
	this.group = null;
	this.bornTime = 0;
	this.platforms = platforms;
};
SmallDragon.prototype = {
	preload: function () {
		"use strict";
		this.game.load.spritesheet('small-dragon', Config.smallDragon.dir, Config.smallDragon.frame.width, Config.smallDragon.frame.height);
	},
	create: function () {
		"use strict";
		this.group = this.game.add.group();
		this.group.createMultiple(Config.smallDragon.number, 'small-dragon');
		this.group.enableBody = true;
		this.game.physics.enable(this.group, Phaser.Physics.ARCADE);
		this.bornTime = this.game.time.now + Config.smallDragon.intervalBorning.actual;
	},
	update: function () {
		"use strict";
		var i;
		this.game.physics.arcade.collide(this.hero.sprite, this.group, this.collision, null, this);
		this.game.physics.arcade.collide(this.group, this.platforms.mainLayer);
		this.group.forEachAlive(this.move, this);
		if (this.game.time.now > this.bornTime) {
		if (Config.smallDragon.intervalBorning.actual > Config.smallDragon.intervalBorning.min) {
			Config.smallDragon.intervalBorning.actual = Config.smallDragon.intervalBorning.actual - Config.smallDragon.intervalBorning.decrement;
		}
			this.bornTime = this.game.time.now + Config.smallDragon.intervalBorning.actual;
			this.born();
		}
	},
	collision: function (spriteHero, spriteSmallDragon) {
		"use strict";
		if (this.hero.sprite.key === 'hero-attack' && this.hero.sprite.scale.x !== spriteSmallDragon.scale.x) {
			spriteSmallDragon.kill();
		} else {
			this.hero.sprite.damage(Config.smallDragon.damage);
		}
	},
	born: function () {
		"use strict";
		var sprite = this.group.getFirstExists(false);
		if (sprite !== null) {
			sprite.reset(Config.smallDragon.xi, Config.smallDragon.yi);
			sprite.animations.add('move', Config.smallDragon.frame.move, Config.global.animationVelocity, true);
			sprite.animations.play('move');
		}
	},
	move: function (spriteSmallDragon) {
		"use strict";
		this.game.physics.arcade.moveToObject(spriteSmallDragon, this.hero.sprite, Config.smallDragon.velocity);
		if (spriteSmallDragon.x > this.hero.sprite.x) {
			spriteSmallDragon.anchor = Config.smallDragon.anchor.right;
			spriteSmallDragon.scale = Config.smallDragon.scale.right;
		} else {
			spriteSmallDragon.anchor = Config.smallDragon.anchor.left;
			spriteSmallDragon.scale = Config.smallDragon.scale.left;
		}
	}
};

