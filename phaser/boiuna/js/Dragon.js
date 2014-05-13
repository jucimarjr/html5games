/*global Config, Phaser*/

var Dragon = function (game, tilemap, hero) {
	"use strict";
    this.game = game;
	this.head = null;
	this.body = null;
	this.hero = hero;
	this.tilemap = tilemap;
	this.time = 0;
};
Dragon.prototype = {
	preload: function () {
		"use strict";
		this.game.load.spritesheet('dragon', Config.dragon.dir, Config.dragon.frame.width, Config.dragon.frame.height);
	},
	create: function () {
		"use strict";
		this.time = this.game.time.now + Config.dragon.timeGrow;
		this.body = this.game.add.group();
        this.body.enableBody = true;
        var group = this.game.add.group();
        group.enableBody = true;
        this.tilemap.map.createFromObjects(Config.dragon.layer, Config.dragon.gid, 'dragon', 0, true, false, group);
        this.head = group.getTop();
		this.game.physics.enable(this.head, Phaser.Physics.ARCADE);
		this.head.body.allowGravity = false;
		this.head.animations.add('move', [Config.dragon.frame.move.one, Config.dragon.frame.move.two, Config.dragon.frame.move.three, Config.dragon.frame.move.four], Config.global.animationVelocity, true);
		this.head.animations.play('move');
	},
	update: function () {
		"use strict";
        var index = 0;
		if (this.game.time.now > this.time && this.body.length < Config.dragon.number.pieces) {
			this.grow();
			this.time = this.game.time.now + Config.dragon.timeGrow;
		}
		this.game.physics.arcade.moveToXY(this.head, Config.dragon.xf, this.head.y, 100);
		for (index = 0; index < this.body.length; index = index + 1) {
			this.game.physics.arcade.moveToXY(this.body.getAt(index), 2 * Config.global.screen.width + 50, this.head.y, 100);
		}
	},
	grow: function () {
        "use strict";
        this.body.create(this.head.x, this.head.y, 'dragon');
        this.head.x += 90;
        var sprite = this.body.getTop();
        sprite.animations.add('fly', [4, 5, 6, 7], Config.global.animationVelocity, true);
        sprite.animations.play('fly');
    },
    move: function () {
		"use strict";
        this.sprite.animations.add('move', [0, 1], Config.global.animationVelocity, true);
	}
};

