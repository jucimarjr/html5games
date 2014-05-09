/*global Config, Phaser*/

var Dragon = function (game, tilemap, hero) {
	"use strict";
    this.game = game;
	this.head = null;
	this.body = null;
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
        this.body.enableBody = true;
        var group = this.game.add.group();
        group.enableBody = true;
        this.tilemap.map.createFromObjects('LayerDragon', 21, 'dragon', 0, true, false, group);
        this.head = group.getTop();
		this.game.physics.enable(this.head, Phaser.Physics.ARCADE);
		this.head.body.allowGravity = false;
		this.head.animations.add('move', [0, 1, 2, 3], Config.global.animationVelocity, true);
		this.head.animations.play('move');
		for(var i=0;i<5;i++){
			this.grow()
		}
		// MOVIMENTO... ANOMALIA COM MAIS DE 10
		this.game.physics.arcade.moveToXY(this.head, Config.global.screen.width*2+50, this.head.y, 100);
		for (var index = 0; index < this.body.length; index++) {
		this.game.physics.arcade.moveToXY(this.body.getAt(index), Config.global.screen.width+50, this.head.y, 100);
		};
		//
	},
	update: function () {
		"use strict";

	},

	grow: function () {
		"use strict";
		this.body.create(this.head.x, this.head.y, 'dragon');
		this.head.x += 90;
		this.body.callAll('animations.add', 'animations', 'fly', [4, 5, 6, 7], Config.global.animationVelocity, true);
    	this.body.callAll('animations.play', 'animations', 'fly');

	}
};

