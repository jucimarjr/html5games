/*global Config, Phaser*/

var Princess = function (game, tilemap) {
	"use strict";
    this.game = game;
	this.head = null;
	this.body = null;
	this.hero = hero;
	this.tilemap = tilemap;
};
Princess.prototype = {
	preload: function () {
		"use strict";
		this.game.load.spritesheet('princess', 'assets/spritesheets/Princess_150-60.png', Config.dragon.frame.width, Config.dragon.frame.height);
	},
	create: function () {
		"use strict";
		this.body = this.game.add.group();
        this.body.enableBody = true;
        var group = this.game.add.group();
        group.enableBody = true;
        this.tilemap.map.createFromObjects('LayerPricess', 7, 'princess', 0, true, false, group);
        this.head = group.getTop();
		this.game.physics.enable(this.head, Phaser.Physics.ARCADE);
		this.head.body.allowGravity = false;
		this.head.animations.add('stay', [0, 1, 2, 3, 4], Config.global.animationVelocity, true);
		this.head.animations.play('stay');
		for(var i=0;i<5;i++){
			this.grow()
		}
	},
	update: function () {
		"use strict";
	},
};

