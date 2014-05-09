/*global Config, Phaser*/

var SmallDragon = function (game, tilemap, hero) {
	"use strict";
    this.game = game;
	this.sprite = null;
	this.hero = hero;
	this.tilemap = tilemap;
};
SmallDragon.prototype = {
	preload: function () {
		"use strict";
		this.game.load.spritesheet('small-dragon', Config.smallDragon.dir, Config.smallDragon.frame.width, Config.smallDragon.frame.height);
	},
	create: function () {
		"use strict";
		var group = this.game.add.group();
        group.enableBody = true;
        this.tilemap.map.createFromObjects(Config.smallDragon.layer, Config.smallDragon.gid, 'small-dragon', 0, true, false, group);
        this.sprite = group.getTop();
		this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.animations.add('move', [0, 1], Config.global.animationVelocity, true);
		this.sprite.animations.play('move');
	},
	update: function () {
		"use strict";
        this.game.physics.arcade.collide(this.sprite, this.hero.sprite, this.collision, null, this);
		this.game.physics.arcade.moveToObject(this.sprite, this.hero.sprite, Config.smallDragon.velocity);
		if (this.sprite.x > this.hero.sprite.x) {
			this.sprite.scale = Config.smallDragon.scale.right;
		} else {
			this.sprite.scale = Config.smallDragon.scale.left;
		}
	},
    collision: function () {
        "use strict";
        if (this.hero.sprite.key === 'hero-attack') {
            this.sprite.kill();
        } else {
            this.hero.sprite.kill();
        }
    }
};

