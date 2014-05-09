/*global Config, Phaser*/

var SmallDragon = function (game, hero) {
	"use strict";
    this.game = game;
	this.hero = hero;
	this.group = null;
    this.bornTime = 0;
};
SmallDragon.prototype = {
	preload: function () {
		"use strict";
		this.game.load.spritesheet('small-dragon', Config.smallDragon.dir.body, Config.smallDragon.frame.width, Config.smallDragon.frame.height);
        this.game.load.image('fire', Config.smallDragon.dir.fire);
	},
	create: function () {
		"use strict";
        var i;
        this.emitters = [];
        for (i = 0; i < Config.smallDragon.number; i = i + 1) {
            this.emitters.push(this.game.add.emitter(0, 0, 200));
            this.emitters[i].makeParticles('fire');
            this.emitters[i].gravity = 150;
        }
	    this.group = this.game.add.group();
        this.group.createMultiple(Config.smallDragon.number, 'small-dragon');
        this.group.enableBody = true;
        this.game.physics.enable(this.group, Phaser.Physics.ARCADE);
        this.bornTime = this.game.time.now + Config.smallDragon.intervalBorning.actual;
	},
	update: function () {
		"use strict";
        var i;
        this.game.physics.arcade.collide(this.hero.sprite, this.group, this.collision, null, this);
        this.group.forEachAlive(this.move, this);
        this.group.forEachAlive(this.shoot, this);
        if (this.game.time.now > this.bornTime) {
            if (Config.smallDragon.intervalBorning.actual > Config.smallDragon.intervalBorning.min) {
                Config.smallDragon.intervalBorning.actual = Config.smallDragon.intervalBorning.actual - Config.smallDragon.intervalBorning.decrement;
            }
			this.bornTime = this.game.time.now + Config.smallDragon.intervalBorning.actual;
			this.born();
		}
        for (i = 0; i < Config.smallDragon.number; i = i + 1) {
            this.emitters[i].x = this.group.getAt(i).x;
            this.emitters[i].y = this.group.getAt(i).y;
        }
	},
    collision: function (spriteHero, spriteSmallDragon) {
        "use strict";
        if (this.hero.sprite.key === 'hero-attack') {
            spriteSmallDragon.kill();
        } else {
            this.hero.sprite.damage(Config.smallDragon.damage);
        }
    },
    born: function () {
        "use strict";
        var sprite = this.group.getFirstExists(false);
	    if (sprite !== null) {
		    sprite.reset(Config.smallDragon.xi, Config.smallDragon.yi);
            sprite.animations.add('move', [Config.smallDragon.frame.normal.move.one, Config.smallDragon.frame.normal.move.two],
                Config.global.animationVelocity, true);
		    sprite.animations.play('move');
        }
    },
    move: function (sprite) {
	    "use strict";
        this.game.physics.arcade.moveToObject(sprite, this.hero.sprite, Config.smallDragon.velocity);
        if (sprite.x > this.hero.sprite.x) {
			sprite.anchor = Config.smallDragon.anchor.right;
		    sprite.scale = Config.smallDragon.scale.right;
		} else {
			sprite.anchor = Config.smallDragon.anchor.left;
		    sprite.scale = Config.smallDragon.scale.left;
		}
	},
    shoot: function (spriteSmallDragon) {
        if (Math.abs(spriteSmallDragon.x - this.hero.sprite.x) < 200 && Math.abs(spriteSmallDragon.y - this.hero.sprite.y) < 200){
            this.emitters[this.group.getIndex(spriteSmallDragon)].start(true, 2000, 100, 3);
        }
        
        
    }
};

