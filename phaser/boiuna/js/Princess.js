/*global Config, Phaser*/

var Princess = function (game, tilemap) {
	"use strict";
    this.game = game;
	this.body = null;
	this.tilemap = tilemap;
};
Princess.prototype = {
	preload: function () {
		"use strict";
		this.game.load.spritesheet('princess', 'assets/spritesheets/Princess_150-60.png', Config.princess.frame.width, Config.princess.frame.height);
	},
	create: function () {
		"use strict";
		this.body = this.game.add.group();
        this.body.enableBody = true;
        this.tilemap.map.createFromObjects('LayerPrincess', 7, 'princess', 0, true, false, this.body);
        this.game.physics.enable(this.body, Phaser.Physics.ARCADE);
		this.body.callAll('animations.add', 'animations', 'stay', [0, 1, 2, 3, 4], Config.global.animationVelocity, true);
        this.body.callAll('animations.play', 'animations', 'stay');
	},
	update: function () {
		"use strict";
	}
};

