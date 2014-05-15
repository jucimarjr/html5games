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
		this.sprite.animations.add('run', [Config.hero.frame.normal.run.one, Config.hero.frame.normal.run.two], Config.global.animationVelocity, true);
		this.game.camera.follow(this.sprite);
	},
	update: function () {
		"use strict";
		if (this.sprite.alive === false) {
			this.game.state.start('DefeatScreen');
		}
		this.game.physics.arcade.collide(this.sprite, this.platforms.mainLayer);
	}
};
