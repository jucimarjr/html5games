/*global Config, Phaser*/

var Dragon = function (game, tilemap, hero, lady) {
	"use strict";
	this.game = game;
	this.head = null;
	this.body = null;
	this.hero = hero;
	this.tilemap = tilemap;
	this.lady = lady;
};
Dragon.prototype = {
	create: function () {
		"use strict";
		this.body = this.game.add.group();
		this.body.enableBody = true;
		var group = this.game.add.group();
		group.enableBody = true;
		this.tilemap.map.createFromObjects(Config.dragon.layer, Config.dragon.gid, 'dragon', Config.dragon.frame.start, true, false, group);
		this.head = group.getTop();
		this.game.physics.enable(this.head, Phaser.Physics.ARCADE);
		this.head.body.allowGravity = false;
		this.head.animations.add('move', Config.dragon.frame.move.head, Config.global.animationVelocity, true);
		this.head.animations.play('move');
		this.head.body.immovable = true;
		this.growBody(Config.dragon.number.pieces);
		this.moveRight();
	},
	update: function () {
		"use strict";
		var tail, space;
		tail = this.body.getFirstAlive();
		this.game.physics.arcade.overlap(this.head, this.lady.group, this.hitLady, null, this);
		if (tail === null) {
			this.head.destroy();
			this.hero.win();
			return;
		}
		if ((tail.x > Config.dragon.xf) && (this.head.scale.x > 0)) {
			this.head.scale.x *= -1;
			this.head.body.offset.x = -Config.dragon.frame.width;
			this.head.y += this.head.height / 2;
			this.growBody(this.body.length);
			space = this.head.width;
			this.head.x -= space;
			this.moveLeft();
		} else if ((tail.x < Config.dragon.xi) && (this.head.scale.x < 0)) {
			this.head.scale.x *= -1;
			this.head.body.offset.x = 0;
			this.head.y += this.head.height / 2;
			this.growBody(this.body.length);
			this.moveRight();
		}
		this.game.physics.arcade.collide(this.hero.sprite, this.body, this.bodyHitHero, null, this);
		this.game.physics.arcade.collide(this.hero.sprite, this.head, this.headHitHero, null, this);
	},
	grow: function () {
		"use strict";
		this.body.create(this.head.x, this.head.y, 'dragon');
		var sprite = this.body.getTop();
		sprite.animations.add('fly', Config.dragon.frame.move.body, Config.global.animationVelocity, true);
		sprite.animations.play('fly');
		sprite.body.immovable = true;
	},
	growBody: function (size) {
		"use strict";
		var i;
		if (this.body.length > 0) {
			this.body.destroy(true, true);
		}
		for (i = 0; i < size; i = i + 1) {
			this.grow();
			Config.dragon.frame.move.body.unshift(Config.dragon.frame.move.body.pop());
			this.head.x += this.head.width;
		}
	},
	moveRight: function () {
		"use strict";
		var index = 0;
		this.game.physics.arcade.moveToXY(this.head, Config.dragon.xf, this.head.y, Config.dragon.velocity);
		for (index = 0; index < this.body.length; index = index + 1) {
			this.game.physics.arcade.moveToXY(this.body.getAt(index), Config.dragon.xf, this.head.y, Config.dragon.velocity);
		}
	},
	moveLeft: function () {
		"use strict";
		var index = 0;
		this.game.physics.arcade.moveToXY(this.head, Config.dragon.xi, this.head.y, Config.dragon.velocity);
		for (index = 0; index < this.body.length; index = index + 1) {
			this.game.physics.arcade.moveToXY(this.body.getAt(index), Config.dragon.xi, this.head.y, Config.dragon.velocity);
		}
	},
	hitLady: function (head, lady) {
		"use strict";
		var space;
		lady.kill();
		if (this.head.scale.x > 0) {
			this.grow();
			space = this.head.width;
			this.head.x += space;
			this.moveRight();
		} else {
			space = this.head.width;
			this.head.x += space;
			this.grow();
			this.moveLeft();
		}
	},
	bodyHitHero: function (spriteHero, spriteSection) {
		"use strict";
		if (spriteSection === this.body.getBottom() && this.hero.sprite.key === 'hero-attack') {
			spriteSection.destroy();
		} else {
			this.hero.hurt(Config.dragon.damage);
		}
	},
	headHitHero: function (spriteHero, spriteHead) {
		"use strict";
		this.hero.hurt(Config.dragon.damage);
	}
};
