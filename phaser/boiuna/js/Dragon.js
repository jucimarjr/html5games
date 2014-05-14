/*global Config, Phaser*/

var Dragon = function (game, tilemap, hero) {
	"use strict";
    this.game = game;
	this.head = null;
	this.body = null;
	this.hero = hero;
	this.tilemap = tilemap;
	this.flag=0;
	//this.time = 0;
};
Dragon.prototype = {
	preload: function () {
		"use strict";
		this.game.load.spritesheet('dragon', Config.dragon.dir, Config.dragon.frame.width, Config.dragon.frame.height);
	},
	create: function () {
		"use strict";
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

		this.growBody(Config.dragon.number.pieces);
		this.moveRight();
	},
	
	update: function () {
		"use strict";
		var tail = this.body.getFirstAlive();
		
        if( (tail.x > 2*Config.global.screen.width) && (this.head.scale.x > 0)){
        	this.head.scale.x *= -1;
        	this.head.y += 90;
        	this.growBody(5);
        	this.moveLeft();
        }
        else if ((tail.x < 0) && (this.head.scale.x < 0)){
        	this.head.scale.x *= -1;
        	this.head.y += 90;
        	this.growBody(5);
        	this.moveRight();
        }
        
	},
	grow: function () {
        "use strict";
        var space = 90;
        console.log(this.head.scale.x);
        if(this.head.scale.x < 0)
        	space*=-1;
        this.body.create(this.head.x, this.head.y, 'dragon');
        this.head.x += space;
        var sprite = this.body.getTop();
        sprite.animations.add('fly', [4, 5, 6, 7], Config.global.animationVelocity, true);
        sprite.animations.play('fly');
    },
    growBody: function(size){
    	if (this.body.length > 0)
    		this.body.destroy(true,true);
    	for(var i=0;i < size; i++){
    			this.grow();
    	}
    },
    moveRight: function(){
    	var index = 0;
		this.game.physics.arcade.moveToXY(this.head, Config.dragon.xf, this.head.y, 100);
		for (index = 0; index < this.body.length; index = index + 1) {
			this.game.physics.arcade.moveToXY(this.body.getAt(index), 2 * Config.global.screen.width + 50, this.head.y, 100);
		}
    },
    moveLeft: function(){
    	var index = 0;
		this.game.physics.arcade.moveToXY(this.head, -50, this.head.y, 100);
		for (index = 0; index < this.body.length; index = index + 1) {
			this.game.physics.arcade.moveToXY(this.body.getAt(index), -50, this.head.y, 100);
		}
    }
};

