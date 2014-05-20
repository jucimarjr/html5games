/*global Config, Phaser*/

var Dragon = function (game, tilemap, hero, princess) {
	"use strict";
    this.game = game;
	this.head = null;
	this.body = null;
	this.hero = hero;
	this.tilemap = tilemap;
    this.princess = princess;
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
		this.head.animations.add('move', Config.dragon.frame.move.head, Config.global.animationVelocity, true);
		this.head.animations.play('move');

		this.growBody(Config.dragon.number.pieces);
		this.moveRight();
	},
	
	update: function () {
		"use strict";
        this.game.physics.arcade.overlap(this.head, this.princess.group, this.hitPrincess, null, this);
		var tail = this.body.getFirstAlive();
        if (tail === null){
			this.head.destroy();
			this.hero.win();
			return;
		}
		if( (tail.x > 2*Config.global.screen.width) && (this.head.scale.x > 0)){
        	this.head.scale.x *= -1;
        	this.head.y += this.head.height/2;
            console.log(this.body.length);
        	this.growBody(this.body.length);
            var space = this.head.width;
            this.head.x -= space;
        	this.moveLeft();
        }
        else if ((tail.x < 0) && (this.head.scale.x < 0)){
        	this.head.scale.x *= -1;
        	this.head.y += this.head.height/2;
            console.log(this.body.length);
        	this.growBody(this.body.length);
        	this.moveRight();
        }
		this.game.physics.arcade.collide(this.body, this.hero.sprite, this.hitHero, null, this);
	},
	grow: function () {
        "use strict";
        this.body.create(this.head.x, this.head.y, 'dragon');
        var sprite = this.body.getTop();
        sprite.animations.add('fly', Config.dragon.frame.move.body, Config.global.animationVelocity, true);
        sprite.animations.play('fly');
		sprite.body.immovable = true;
    },
    growBody: function(size){
    	if (this.body.length > 0)
    		this.body.destroy(true,true);
    	for(var i=0;i < size; i++){
			this.grow();
			Config.dragon.frame.move.body.unshift(Config.dragon.frame.move.body.pop());
			this.head.x += this.head.width;
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
    },
    hitPrincess: function(head, princess){

        princess.kill();
        
        if(this.head.scale.x > 0){
            this.grow();
            var space = this.head.width;
            this.head.x += space;
            this.moveRight();
        }
        else{
            var space = this.head.width;
            this.head.x += space;
            this.grow();
            this.moveLeft();
        }
            

    },
	hitHero: function(spriteHero, spriteSection){
		if(spriteSection == this.body.getBottom() && this.hero.sprite.key === 'hero-attack'){
			spriteSection.destroy();
		} else {
			this.hero.hurt(100);
		}
	}
};
