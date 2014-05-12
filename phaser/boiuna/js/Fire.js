/*global Config, Phaser*/

var Fire = function (game, hero, smallDragon) {
    "use strict";
    this.game = game;
    this.smallDragon = smallDragon;
    this.group = null;
};
Fire.prototype = {
    preload: function () {
        "use strict";
        this.game.load.image('fire', Config.smallDragon.dir.fire);
    },
    create: function () {
        "use strict";
        this.group = this.game.add.group();
        this.group.createMultiple(100, 'fire');
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
        if (Math.abs(sprite.x - this.hero.sprite.x) < 200 && Math.abs(sprite.y - this.hero.sprite.y) < 200) {
            var fire = this.groupFire.getFirstExists(false);
            if (fire !== null) {
                fire.reset(sprite.x, sprite.y + 30);
                fire.lifespan = 1000;
                this.game.physics.arcade.moveToObject(fire, this.hero.sprite, Config.smallDragon.velocity + 100);
            }
        }
    }
};