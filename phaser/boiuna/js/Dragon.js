/*global Config, Phaser*/

var Dragon = function (game, tilemap, hero) {
	"use strict";
    this.game = game;
	this.head = null;
	this.group = null;
	this.hero = hero;
	this.tilemap = tilemap;
};
Dragon.prototype = {
	preload: function () {
		"use strict";
		this.game.load.spritesheet('dragon', 'assets/spritesheets/Boiuna_360-270.png', Config.dragon.frame.width, Config.dragon.frame.height);
	},
	create: function () {
		"use strict";
		this.body = this.game.add.group();
		var group = this.game.add.group();
        group.enableBody = true;
        this.tilemap.map.createFromObjects('LayerDragon', 21, 'dragon', 0, true, false, group);
        this.head = group.getTop();
		this.game.physics.enable(this.head, Phaser.Physics.ARCADE);
		this.head.body.allowGravity = false;
		this.head.animations.add('move', [0, 1, 2, 3], Config.global.animationVelocity, true);
		this.head.animations.play('move');
		for(var i=0;i<3;i++){
			setTimeout(this.grow(), 10);
		}
	},
	update: function () {
		"use strict";
		this.game.physics.arcade.moveToXY(this.head, Config.global.screen.width*2+50, this.head.y, 100);
		//this.game.physics.arcade.moveToXY(this.body, Config.global.screen.width+50, this.head.y, 100);

	},

	grow: function () {
		"use strict";
		this.body.create(this.head.x, this.head.y, 'dragon');
		this.head.x += 90;
		this.body.callAll('animations.add', 'animations', 'fly', [4, 5, 6, 7], Config.global.animationVelocity, true);
    	this.body.callAll('animations.play', 'animations', 'fly');

	}
};

