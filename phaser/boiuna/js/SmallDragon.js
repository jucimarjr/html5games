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
        this.groupFire = this.game.add.group();
        this.groupFire.createMultiple(100, 'fire');
        this.groupFire.enableBody = true;
        this.game.physics.enable(this.groupFire, Phaser.Physics.ARCADE);
        this.groupFire.setAll('exists', false);
        this.groupFire.setAll('visible', false);
        this.groupFire.setAll('alive', false);
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
    move: function (spriteSmallDragon) {
	    "use strict";
        this.game.physics.arcade.moveToObject(spriteSmallDragon, this.hero.sprite, Config.smallDragon.velocity);
        if (spriteSmallDragon.x > this.hero.sprite.x) {
			spriteSmallDragon.anchor = Config.smallDragon.anchor.right;
		    spriteSmallDragon.scale = Config.smallDragon.scale.right;
		} else {
			spriteSmallDragon.anchor = Config.smallDragon.anchor.left;
		    spriteSmallDragon.scale = Config.smallDragon.scale.left;
		}
	},
    shoot: function (spriteSmallDragon) {
        "use strict";
        if (Math.abs(spriteSmallDragon.x - this.hero.sprite.x) < 200 && Math.abs(spriteSmallDragon.y - this.hero.sprite.y) < 200) {
            var fire = this.groupFire.getFirstExists(false);
            if (fire !== null) {
                fire.reset(spriteSmallDragon.x, spriteSmallDragon.y + 30);
                fire.lifespan = 1000;
                this.game.physics.arcade.moveToObject(fire, this.hero.sprite, Config.smallDragon.velocity + 100);
            }
        }
    }
};

