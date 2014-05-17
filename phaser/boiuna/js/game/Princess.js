/*global Config, Phaser*/

var Princess = function (game, tilemap) {
	"use strict";
    this.game = game;
	this.group = null;
	this.tilemap = tilemap;
};
Princess.prototype = {
	preload: function () {
		"use strict";
		this.game.load.spritesheet('princess', 'assets/spritesheets/Princess_150-60.png', Config.princess.frame.width, Config.princess.frame.height);
	},
	create: function () {
		"use strict";
		this.group = this.game.add.group();
        this.group.enableBody = true;
        this.tilemap.map.createFromObjects('LayerPrincess', 7, 'princess', 0, true, false, this.group);
        this.game.physics.enable(this.group, Phaser.Physics.ARCADE);
		this.group.callAll('animations.add', 'animations', 'stay', [0, 1, 2, 3, 4], Config.global.animationVelocity, true);
        this.group.callAll('animations.play', 'animations', 'stay');
	},
	update: function () {
		"use strict";
	}
};

