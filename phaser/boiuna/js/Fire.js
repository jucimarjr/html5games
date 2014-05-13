/*global Config, Phaser*/

var Fire = function (game, hero, smallDragon) {
    "use strict";
    this.game = game;
    this.hero = hero;
    this.smallDragon = smallDragon;
    this.group = null;
};
Fire.prototype = {
    preload: function () {
        "use strict";
        this.game.load.image('fire', Config.fire.dir);
    },
    create: function () {
        "use strict";
        this.group = this.game.add.group();
        this.group.createMultiple(Config.fire.number, 'fire');
        this.group.enableBody = true;
        this.game.physics.enable(this.group, Phaser.Physics.ARCADE);
        this.group.setAll('exists', false);
        this.group.setAll('visible', false);
        this.group.setAll('alive', false);
    },
    update: function () {
        "use strict";
        this.smallDragon.group.forEachAlive(this.shoot, this);
    },
    shoot: function (sprite) {
        "use strict";
        if (Math.abs(sprite.x - this.hero.sprite.x) < Config.fire.range && Math.abs(sprite.y - this.hero.sprite.y) < Config.fire.range) {
            var fire = this.group.getFirstExists(false);
            if (fire !== null) {
                if (sprite.scale === Config.smallDragon.scale.left) {
                    fire.reset(sprite.x + Config.fire.adjust.x, sprite.y + Config.fire.adjust.y);
                } else {
                    fire.reset(sprite.x, sprite.y + Config.fire.adjust.y);
                }
                fire.lifespan = Config.fire.lifespan;
                this.game.physics.arcade.moveToObject(fire, this.hero.sprite, Config.fire.velocity);
            }
        }
    }
};