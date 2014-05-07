/*global Config, Phaser, Console*/

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
        this.game.load.spritesheet('hero', Config.hero.dir, Config.hero.frame.width, Config.hero.frame.height);
	},
	create: function () {
		"use strict";
        var group = this.game.add.group();
        group.enableBody = true;
        this.tilemap.map.createFromObjects('LayerHero', 12, 'hero', 0, true, false, group);
        this.sprite = group.getTop();
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.body.collideWorldBounds = true;
		this.sprite.body.gravity.y = Config.hero.gravity;
		this.sprite.animations.add('walk', [1, 2], Config.global.animationVelocity, true);
	},
	update: function () {
		"use strict";
        this.game.physics.arcade.collide(this.sprite, this.platforms.mainLayer);
        this.game.camera.follow(this.sprite);
		var cursors = this.game.input.keyboard.createCursorKeys();
		this.sprite.body.velocity.setTo(Config.hero.velocity.initial.x, Config.hero.velocity.initial.y);
		if (cursors.right.isDown) {
			this.sprite.anchor = Config.hero.anchor.right;
			this.sprite.body.velocity.x = Config.hero.velocity.run;
			if (this.sprite.body.onFloor()) {
                this.sprite.animations.play('walk');
			}
			this.sprite.scale = Config.hero.scale.right;
		} else if (cursors.left.isDown) {
			this.sprite.anchor = Config.hero.anchor.left;
			this.sprite.body.velocity.x = -Config.hero.velocity.run;
			this.sprite.scale = Config.hero.scale.left;
			if (this.sprite.body.onFloor()) {
				this.sprite.animations.play('walk');
			}
        } else if (this.sprite.body.onFloor()) {
			this.sprite.body.velocity.x = 0;
			this.sprite.animations.stop();
			this.sprite.frame = 0;
		}
		if (cursors.up.isDown && this.sprite.body.onFloor()) {
			this.sprite.animations.stop();
			this.sprite.body.velocity.y = Config.hero.velocity.jump;
			this.jumpControl = this.jumpControl + 1;
			this.sprite.frame = 3;
		} else if (cursors.up.isDown && this.jumpControl < Config.hero.jump.max && this.jumpControl !== 0) {
			this.sprite.body.velocity.y = Config.hero.velocity.jump;
			this.jumpControl = this.jumpControl + 1;
        } else if (!this.sprite.body.onFloor()) {
			this.jumpControl = 0;
			this.sprite.frame = 4;
		}
	}
};
