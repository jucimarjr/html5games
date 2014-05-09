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
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.body.collideWorldBounds = true;
		this.sprite.body.gravity.y = Config.hero.gravity;
		this.sprite.animations.add('run', [Config.hero.frame.normal.run.one, Config.hero.frame.normal.run.two], Config.global.animationVelocity, true);
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
			if (this.sprite.body.onFloor() && this.sprite.key === 'hero-normal') {
                this.sprite.animations.play('run');
			}
			this.sprite.scale = Config.hero.scale.right;
		} else if (cursors.left.isDown) {
			this.sprite.anchor = Config.hero.anchor.left;
			this.sprite.body.velocity.x = -Config.hero.velocity.run;
			if (this.sprite.body.onFloor() && this.sprite.key === 'hero-normal') {
				this.sprite.animations.play('run');
			}
			this.sprite.scale = Config.hero.scale.left;
        } else if (this.sprite.body.onFloor()) {
			this.sprite.body.velocity.x = 0;
            if (this.sprite.key === 'hero-normal') {
			    this.sprite.animations.stop();
			    this.sprite.frame = Config.hero.frame.normal.stopped;
            }
		}
		if (cursors.up.isDown && this.sprite.body.onFloor()) {
			this.sprite.body.velocity.y = Config.hero.velocity.jump;
			this.jumpControl = this.jumpControl + 1;
            if (this.sprite.key === 'hero-normal') {
			    this.sprite.animations.stop();
                this.sprite.frame = Config.hero.frame.normal.jumping;
            }
		} else if (cursors.up.isDown && this.jumpControl < Config.hero.jump.max && this.jumpControl !== 0) {
			this.sprite.body.velocity.y = Config.hero.velocity.jump;
			this.jumpControl = this.jumpControl + 1;
        } else if (!this.sprite.body.onFloor()) {
			this.jumpControl = 0;
            if (this.sprite.key === 'hero-normal') {
			    this.sprite.frame = Config.hero.frame.normal.falling;
            }
		}
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SHIFT) && this.sprite.alive && this.sprite.key !== 'hero-attack') {
            this.sprite.loadTexture('hero-attack');
            this.sprite.animations.add('attack', [Config.hero.frame.attack.one, Config.hero.frame.attack.two], Config.global.animationVelocity, true);
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.SHIFT) && this.sprite.alive && this.sprite.key === 'hero-attack') {
            this.sprite.animations.play('attack');
        } else if (this.sprite.alive && this.sprite.key !== 'hero-normal') {
            this.sprite.loadTexture('hero-normal');
        }
	}
};
