/*global Config, Phaser*/

var Princess = function (game, platforms, lady, dragon, hero) {
	"use strict";
    this.game = game;
	this.sprite = null;
	this.lady = lady;
	this.dragon = dragon;
	this.platforms = platforms;
	this.flag = true;
	this.hero = hero;
};
Princess.prototype = {
	preload: function () {
		"use strict";
		this.game.load.spritesheet('princess', 'assets/spritesheets/Princess_135-78.png', Config.princess.frame.width, Config.princess.frame.height);
	},
	create: function () {
		"use strict";
		var x = Math.floor(Math.random() * 960 + 960 - Config.princess.frame.width);
		var y = Math.floor(Math.random() * 600 - Config.princess.frame.height - 60);
		this.sprite = this.game.add.sprite(x, y, 'princess');
		this.sprite.alpha = 0;
	    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.body.gravity.y = 1000;
		this.sprite.animations.add('stay', [0, 1, 2, 1], Config.global.animationVelocity, true);
        this.sprite.animations.play('stay');
	},
	update: function () {
		"use strict";
		this.game.physics.arcade.collide(this.sprite, this.platforms.mainLayer);
		if(this.lady.group.getFirstAlive() === null && this.flag){
			this.flag = false;
			this.sprite.alpha = 1;
	    	this.dragon.head.y = this.sprite.y;
			this.dragon.head.x = -90*this.dragon.body.length;
			this.dragon.growBody(this.dragon.body.length);
			this.dragon.moveRight();
		}
		if(this.lady.group.getFirstAlive() === null)
        	this.game.physics.arcade.overlap(this.dragon.head, this.sprite, this.collision, null, this);
	},
	collision: function () {
		this.sprite.kill();
		this.hero.sprite.kill();
	}
};