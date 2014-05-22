/*global Config, Phaser*/

var Hero = function (game, tilemap, platforms) {
	"use strict";
	this.game = game;
	this.sprite = null;
	this.jumpControl = 0;
	this.tilemap = tilemap;
	this.platforms = platforms;
};
Hero.prototype = {
	preload: function () {
		"use strict";
		this.game.load.spritesheet('hero-normal', Config.hero.dir.normal, Config.hero.frame.normal.width, Config.hero.frame.normal.height);
		this.game.load.spritesheet('hero-attack', Config.hero.dir.attack, Config.hero.frame.attack.width, Config.hero.frame.attack.height);
	},
	create: function () {
		"use strict";
		var group = this.game.add.group();
		group.enableBody = true;
		this.tilemap.map.createFromObjects(Config.hero.layer, Config.hero.gid, 'hero-normal', Config.hero.frame.normal.stopped, true, false, group);
		this.sprite = group.getTop();
		this.sprite.alive = true;
		this.sprite.health = Config.hero.health.initial;
		this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.body.collideWorldBounds = true;
		this.sprite.body.gravity.y = Config.hero.gravity;
		this.sprite.animations.add('run', Config.hero.frame.normal.run, Config.global.animationVelocity, true);
		this.game.camera.follow(this.sprite);
		this.sprite.events.onKilled.add(this.onKill, this);
	},
	update: function () {
		"use strict";
		this.game.physics.arcade.collide(this.sprite, this.platforms.mainLayer);
	},
	moveLeft: function () {
		"use strict";
		this.sprite.anchor = Config.hero.anchor.left;
		this.sprite.body.velocity.x = -Config.hero.velocity.run;
		if (this.sprite.body.onFloor() && this.sprite.key === 'hero-normal') {
			this.sprite.animations.play('run');
		}
		this.sprite.scale = Config.hero.scale.left;
	},
	moveRight: function () {
		"use strict";
		this.sprite.anchor = Config.hero.anchor.right;
		this.sprite.body.velocity.x = Config.hero.velocity.run;
		if (this.sprite.body.onFloor() && this.sprite.key === 'hero-normal') {
			this.sprite.animations.play('run');
		}
		this.sprite.scale = Config.hero.scale.right;
	},
	jump: function () {
		"use strict";
		if (this.sprite.body.onFloor()) {
			this.sprite.body.velocity.y = Config.hero.velocity.jump;
			this.jumpControl = this.jumpControl + 1;
			if (this.sprite.key === 'hero-normal') {
				this.sprite.animations.stop();
				this.sprite.frame = Config.hero.frame.normal.jumping;
			}
		} else if (this.jumpControl < Config.hero.jump.max && this.jumpControl !== 0) {
			this.sprite.body.velocity.y = Config.hero.velocity.jump;
			this.jumpControl = this.jumpControl + 1;
		}
	},
	hit: function () {
		"use strict";
		if (this.sprite.key !== 'hero-attack') {
			this.sprite.y -= Config.hero.frame.attack.height - Config.hero.frame.normal.height;
			this.sprite.loadTexture('hero-attack');
			this.sprite.body.setSize(Config.hero.frame.attack.width, Config.hero.frame.attack.height);
			this.sprite.animations.add('attack', Config.hero.frame.attack.hit, Config.global.animationVelocity, true);
		} else {
			this.sprite.animations.play('attack');
		}
	},
	restoreTexture: function () {
		"use strict";
		if (this.sprite.key !== 'hero-normal' && this.sprite.alive) {
			this.sprite.loadTexture('hero-normal');
			this.sprite.body.setSize(Config.hero.frame.normal.width, Config.hero.frame.normal.height);
			this.sprite.y += Config.hero.frame.attack.height - Config.hero.frame.normal.height;
		}
	},
	hurt: function (damage) {
		"use strict";
		this.game.add.tween(this.sprite).to({alpha : 0.3}, 100, Phaser.Easing.Linear.None).to({alpha : 1}, 100, Phaser.Easing.Linear.None).start();
		this.sprite.damage(damage);
	},
	onKill: function () {
		"use strict";
		this.sprite.visible = true;
		var tweenDie = this.game.add.tween(this.game.world).to({alpha : 0.3}, 10000, Phaser.Easing.Linear.None).to({alpha : 1}, 100, Phaser.Easing.Linear.None).start();
		tweenDie.onComplete.add(function () {
			this.game.world.alpha = 1;
			this.game.state.start('DefeatScreen'); 
		}, this);
	},
	stop: function () {
		"use strict";
		if (this.sprite.key === 'hero-normal') {
			this.sprite.animations.stop();
			this.sprite.frame = Config.hero.frame.normal.stopped;
		}
		this.sprite.body.velocity.x = Config.hero.velocity.initial.x;
	},
	fall: function () {
		this.jumpControl = 0;
		if (this.sprite.key === 'hero-normal') {
			this.sprite.frame = Config.hero.frame.normal.falling;
		}
	},
	win: function () {
		"use strict";
		this.game.state.start('VictoryScreen'); 
	}
};
